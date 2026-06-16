#!/bin/bash

set -euo pipefail

: "${GITHUB_APP_ID:?Missing GITHUB_APP_ID}"
: "${GITHUB_APP_PRIVATE_KEY:?Missing GITHUB_APP_PRIVATE_KEY}"
: "${GITHUB_APP_INSTALLATION_ID:?Missing GITHUB_APP_INSTALLATION_ID}"

OUTPUT_TOKEN_FILE="${OUTPUT_TOKEN_FILE:-/root/.dockersock/github_app_token.txt}"

cleanup() {
  rm -f /tmp/github_app_private_key.pem
}
trap cleanup EXIT

printf '%b' "${GITHUB_APP_PRIVATE_KEY}" > /tmp/github_app_private_key.pem
chmod 600 /tmp/github_app_private_key.pem

b64url() {
  openssl base64 -A | tr "+/" "-_" | tr -d "="
}

APP_ID="$(printf "%s" "${GITHUB_APP_ID}" | tr -d "[:space:]")"
INSTALLATION_ID="$(printf "%s" "${GITHUB_APP_INSTALLATION_ID:-}" | tr -d "[:space:]")"

[[ "${APP_ID}" =~ ^[0-9]+$ ]] || { echo "GITHUB_APP_ID must be numeric"; exit 1; }
[[ "${INSTALLATION_ID}" =~ ^[0-9]+$ ]] || { echo "GITHUB_APP_INSTALLATION_ID must be numeric"; exit 1; }

NOW=$(date +%s)
EXP=$((NOW + 540))
HEADER_B64=$(printf '{"alg":"RS256","typ":"JWT"}' | b64url)
PAYLOAD_B64=$(printf '{"iat":%s,"exp":%s,"iss":"%s"}' "${NOW}" "${EXP}" "${APP_ID}" | b64url)
UNSIGNED_TOKEN="${HEADER_B64}.${PAYLOAD_B64}"
SIGNATURE_B64=$(printf "%s" "${UNSIGNED_TOKEN}" | openssl dgst -binary -sha256 -sign /tmp/github_app_private_key.pem | b64url)
JWT="${UNSIGNED_TOKEN}.${SIGNATURE_B64}"

TOKEN_RESPONSE=$(curl -sS -X POST \
  -H "Authorization: Bearer ${JWT}" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/app/installations/${INSTALLATION_ID}/access_tokens")

TOKEN="$(echo "${TOKEN_RESPONSE}" | jq -r '.token // empty')"
test -n "${TOKEN}" || (echo "Failed to create GitHub App installation token" && echo "${TOKEN_RESPONSE}" && exit 1)

mkdir -p "$(dirname "${OUTPUT_TOKEN_FILE}")"
printf "%s" "${TOKEN}" > "${OUTPUT_TOKEN_FILE}"
chmod 600 "${OUTPUT_TOKEN_FILE}"
