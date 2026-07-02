#!/bin/bash

set -euo pipefail

: "${GITHUB_APP_TOKEN:?Missing GITHUB_APP_TOKEN}"
: "${DRONE_PULL_REQUEST:?Missing DRONE_PULL_REQUEST}"
: "${DRONE_REPO:?Missing DRONE_REPO}"
: "${DRONE_BUILD_NUMBER:?Missing DRONE_BUILD_NUMBER}"
: "${DRONE_BUILD_LINK:?Missing DRONE_BUILD_LINK}"

if [ ! -d "playwright-report" ]; then
  echo "Missing playwright-report directory"
  exit 1
fi

REPORT_ARCHIVE="playwright-report-pr-${DRONE_PULL_REQUEST}-${DRONE_BUILD_NUMBER}.zip"
zip -r "$REPORT_ARCHIVE" playwright-report

GH_API="https://api.github.com/repos/${DRONE_REPO}"
TAG_NAME="pr-${DRONE_PULL_REQUEST}-playwright-report"

RELEASE_RESPONSE_FILE="$(mktemp)"
RELEASE_HTTP_CODE="$(curl -sS -o "$RELEASE_RESPONSE_FILE" -w "%{http_code}" \
  -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  "${GH_API}/releases/tags/${TAG_NAME}")"

if [ "$RELEASE_HTTP_CODE" = "404" ]; then
  RELEASE_HTTP_CODE="$(curl -sS -o "$RELEASE_RESPONSE_FILE" -w "%{http_code}" -X POST \
    -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "${GH_API}/releases" \
    -d "$(jq -n --arg tag "$TAG_NAME" --arg name "Playwright Report PR #${DRONE_PULL_REQUEST}" '{tag_name:$tag,name:$name,prerelease:true,draft:false}')")"
fi

if ! [[ "$RELEASE_HTTP_CODE" =~ ^2 ]]; then
  echo "Failed to fetch/create release (HTTP ${RELEASE_HTTP_CODE})"
  sed -n '1,30p' "$RELEASE_RESPONSE_FILE"
  rm -f "$RELEASE_RESPONSE_FILE"
  exit 1
fi

if ! jq -e . "$RELEASE_RESPONSE_FILE" >/dev/null 2>&1; then
  echo "Release API returned non-JSON response"
  sed -n '1,30p' "$RELEASE_RESPONSE_FILE"
  rm -f "$RELEASE_RESPONSE_FILE"
  exit 1
fi

RELEASE_ID="$(jq -r '.id // empty' "$RELEASE_RESPONSE_FILE")"
if [ -z "$RELEASE_ID" ]; then
  echo "Release response missing id"
  sed -n '1,30p' "$RELEASE_RESPONSE_FILE"
  rm -f "$RELEASE_RESPONSE_FILE"
  exit 1
fi

for ASSET_ID in $(jq -r --arg prefix "playwright-report-pr-${DRONE_PULL_REQUEST}-" '.assets[]? | select(.name | startswith($prefix)) | .id' "$RELEASE_RESPONSE_FILE"); do
  curl -sS -X DELETE \
    -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "${GH_API}/releases/assets/${ASSET_ID}" >/dev/null
done

rm -f "$RELEASE_RESPONSE_FILE"

ASSET_RESPONSE_FILE="$(mktemp)"
UPLOAD_HTTP_CODE="$(curl -sS -o "$ASSET_RESPONSE_FILE" -w "%{http_code}" -X POST \
  -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
  -H "Content-Type: application/zip" \
  --data-binary @"${REPORT_ARCHIVE}" \
  "https://uploads.github.com/repos/${DRONE_REPO}/releases/${RELEASE_ID}/assets?name=${REPORT_ARCHIVE}")"

if ! [[ "$UPLOAD_HTTP_CODE" =~ ^2 ]]; then
  echo "Failed to upload report asset (HTTP ${UPLOAD_HTTP_CODE})"
  sed -n '1,30p' "$ASSET_RESPONSE_FILE"
  rm -f "$ASSET_RESPONSE_FILE"
  exit 1
fi

if ! jq -e . "$ASSET_RESPONSE_FILE" >/dev/null 2>&1; then
  echo "Asset upload returned non-JSON response"
  sed -n '1,30p' "$ASSET_RESPONSE_FILE"
  rm -f "$ASSET_RESPONSE_FILE"
  exit 1
fi

DOWNLOAD_URL="$(jq -r '.browser_download_url // empty' "$ASSET_RESPONSE_FILE")"
rm -f "$ASSET_RESPONSE_FILE"
if [ -z "$DOWNLOAD_URL" ]; then
  echo "Upload succeeded but browser_download_url is missing"
  exit 1
fi

COMMENT_BODY=$(cat <<EOF
Playwright HTML report for this PR build is available here:
* ${DOWNLOAD_URL}

Drone build: ${DRONE_BUILD_LINK}
EOF
)

GH_COMMENT_RESPONSE=$(curl -sS -X POST \
  -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  "${GH_API}/issues/${DRONE_PULL_REQUEST}/comments" \
  -d "$(jq -n --arg body "$COMMENT_BODY" '{body: $body}')")

if ! echo "$GH_COMMENT_RESPONSE" | jq -e . >/dev/null 2>&1; then
  echo "GitHub comment API returned non-JSON response"
  echo "$GH_COMMENT_RESPONSE"
  exit 1
fi

GH_COMMENT_URL="$(echo "$GH_COMMENT_RESPONSE" | jq -r '.html_url // empty')"
if [ -z "$GH_COMMENT_URL" ]; then
  echo "Failed to create GitHub PR comment"
  echo "$GH_COMMENT_RESPONSE"
  exit 1
fi

echo "Uploaded report asset: ${DOWNLOAD_URL}"
echo "Posted PR comment: ${GH_COMMENT_URL}"
