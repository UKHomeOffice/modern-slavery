#! /bin/bash
set -e

export INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-internal-annotations.yaml
export INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-external-annotations.yaml
export CONFIGMAP_VALUES=$HOF_CONFIG/configmap-values.yaml
export NGINX_SETTINGS=$HOF_CONFIG/nginx-settings.yaml
export DATA_SERVICE_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/data-service-external-annotations.yaml
export KUBE_CERTIFICATE_AUTHORITY=https://raw.githubusercontent.com/UKHomeOffice/acp-ca/master/acp-notprod.crt

kd='kd --timeout 10m --check-interval 5s'

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(cat /root/.dockersock/branch_name.txt)

  $kd --delete -f kube/configmaps/configmap.yml
  $kd --delete -f kube/redis -f kube/save-return-data-alerts -f kube/save-return-lookup -f kube/dashboard -f kube/icasework -f kube/app
  echo "Torn Down UAT Branch - ms-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(echo $DRONE_SOURCE_BRANCH | tr '[:upper:]' '[:lower:]' | tr '/' '-')

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  $kd -f kube/configmaps -f kube/certs
  $kd -f kube/redis -f kube/save-return-data-alerts
  $kd -f kube/save-return-lookup
  $kd -f kube/icasework -f kube/dashboard
  $kd -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml
  $kd -f kube/redis -f kube/save-return-data-alerts
  $kd -f kube/save-return-lookup
  $kd -f kube/icasework -f kube/dashboard
  $kd -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml
  $kd -f kube/redis -f kube/save-return-data-alerts
  $kd -f kube/save-return-lookup
  $kd -f kube/icasework -f kube/dashboard
  $kd -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  export KUBE_CERTIFICATE_AUTHORITY=https://raw.githubusercontent.com/UKHomeOffice/acp-ca/master/acp-prod.crt

  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/govuk-ingress -f kube/app/ingress-external.yml -f kube/app/networkpolicy-external.yml
  $kd -f kube/redis -f kube/save-return-data-alerts
  $kd -f kube/save-return-lookup
  $kd -f kube/icasework -f kube/dashboard
  $kd -f kube/app/deployment.yml
fi

sleep $READY_FOR_TEST_DELAY

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  echo "App Branch - ms-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Lookup UI Branch - lookup-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Data Service Branch - data-service-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
fi
