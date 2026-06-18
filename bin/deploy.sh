#! /bin/bash
set -e

export INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-internal-annotations.yaml
export INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-external-annotations.yaml
export CONFIGMAP_VALUES=$HOF_CONFIG/configmap-values.yaml
export NGINX_SETTINGS=$HOF_CONFIG/nginx-settings.yaml
export DATA_SERVICE_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/data-service-external-annotations.yaml
export KUBE_CERTIFICATE_AUTHORITY=https://raw.githubusercontent.com/UKHomeOffice/acp-ca/master/acp-notprod.crt
export FILEVAULT_NGINX_SETTINGS=$HOF_CONFIG/filevault-nginx-settings.yaml
export FILEVAULT_INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/filevault-ingress-external-annotations.yaml

export SCHEMA_ACTION=migrate

kd='kd --timeout 10m --check-interval 5s'

compute_branch_slug_max_length() {
  local dns_label_limit=63
  local app_name_length=${#APP_NAME}
  local max_for_app_name
  local max_for_configmap_name
  local max_branch_length

  # ${APP_NAME}-${DRONE_SOURCE_BRANCH}
  max_for_app_name=$((dns_label_limit - app_name_length - 1))

  # ${APP_NAME}-configmap-${DRONE_SOURCE_BRANCH}
  max_for_configmap_name=$((dns_label_limit - app_name_length - 11))

  max_branch_length=$max_for_app_name
  if (( max_for_configmap_name < max_branch_length )); then
    max_branch_length=$max_for_configmap_name
  fi

  if (( max_branch_length < 8 )); then
    max_branch_length=8
  fi

  echo "$max_branch_length"
}

sanitize_branch_name() {
  local raw_branch="$1"
  local max_length="${2:-40}"
  local sanitized_branch

  sanitized_branch=$(echo "$raw_branch" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g')

  if [[ -z "$sanitized_branch" ]]; then
    sanitized_branch='branch'
  fi

  sanitized_branch="${sanitized_branch:0:max_length}"
  sanitized_branch=$(echo "$sanitized_branch" | sed -E 's/-+$//')

  if [[ -z "$sanitized_branch" ]]; then
    sanitized_branch='branch'
  fi

  echo "$sanitized_branch"
}

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export BRANCH_SLUG_MAX_LENGTH=$(compute_branch_slug_max_length)
  export DRONE_SOURCE_BRANCH=$(sanitize_branch_name "$(cat /root/.dockersock/branch_name.txt)" "${BRANCH_SLUG_MAX_LENGTH}")

  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd --delete -f kube/configmaps/configmap.yml
  $kd --delete -f kube/redis -f kube/save-return-data-alerts -f kube/save-return-lookup -f kube/dashboard -f kube/icasework -f kube/app -f kube/file-vault
  echo "Torn Down UAT Branch - ms-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export BRANCH_SLUG_MAX_LENGTH=$(compute_branch_slug_max_length)
export DRONE_SOURCE_BRANCH=$(sanitize_branch_name "${DRONE_SOURCE_BRANCH}" "${BRANCH_SLUG_MAX_LENGTH}")

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/file-vault/file-vault-ingress.yml 
  $kd -f kube/configmaps -f kube/certs
  $kd -f kube/icasework -f kube/dashboard
  $kd -f kube/redis -f kube/save-return-data-alerts
  $kd -f kube/save-return-lookup
  $kd -f kube/file-vault
  $kd -f kube/app 
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/file-vault/file-vault-ingress.yml 
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/configmaps/configmap.yml -f kube/save-return-lookup/ingress.yml
  $kd -f kube/icasework -f kube/dashboard
  $kd -f kube/redis -f kube/save-return-data-alerts
  $kd -f kube/save-return-lookup
  $kd -f kube/file-vault
  $kd -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/file-vault/file-vault-ingress.yml 
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/configmaps/configmap.yml -f kube/save-return-lookup/ingress.yml
  $kd -f kube/icasework -f kube/dashboard
  $kd -f kube/redis -f kube/save-return-data-alerts
  $kd -f kube/save-return-lookup
  $kd -f kube/file-vault 
  $kd -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  export KUBE_CERTIFICATE_AUTHORITY=https://raw.githubusercontent.com/UKHomeOffice/acp-ca/master/acp-prod.crt

  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/file-vault/file-vault-ingress.yml 
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml -f kube/save-return-lookup/ingress.yml
  $kd -f kube/icasework -f kube/dashboard
  $kd -f kube/govuk-ingress -f kube/app/ingress-external.yml -f kube/app/networkpolicy-external.yml
  $kd -f kube/redis -f kube/save-return-data-alerts
  $kd -f kube/save-return-lookup
  $kd -f kube/file-vault
  $kd -f kube/app/deployment.yml
fi

sleep $READY_FOR_TEST_DELAY

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  echo "App Branch - ms-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Lookup UI Branch - lookup-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Data Service Branch - data-service-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Dashboard UI Branch - dashboard-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"

  # Add branch URL to a file for use in e2e tests, if the directory exists (it won't in production)
  BRANCH_HOST="ms-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Branch - $BRANCH_HOST"
  if [[ -d /root/.dockersock ]]; then
    echo "$BRANCH_HOST" > /root/.dockersock/branch_url.txt
  fi
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  echo "UAT App - uat.ms-notprod.homeoffice.gov.uk"
  echo "UAT Data Service - uat-data-service.ms-notprod.homeoffice.gov.uk"
  echo "UAT Lookup UI - uat-lookup.ms-notprod.homeoffice.gov.uk"
  echo "UAT Dashboard UI - uat-dashboard.ms-notprod.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  echo "STG App - preprod.ms-notprod.homeoffice.gov.uk"
  echo "STG Data Service - preprod-data-service.ms-notprod.homeoffice.gov.uk"
  echo "STG Lookup UI - preprod-lookup.ms-notprod.homeoffice.gov.uk"
  echo "STG Dashboard UI - dashboard.ms-notprod.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  echo "PROD App - www.modernslavery.homeoffice.gov.uk"
  echo "PROD Data Service - data-service.modernslavery.homeoffice.gov.uk"
  echo "PROD Lookup UI - lookup.modernslavery.homeoffice.gov.uk"
  echo "PROD Dashboard UI - dashboard.modernslavery.homeoffice.gov.uk"
fi
