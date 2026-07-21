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

export REDIS_PERSISTENCE_ENABLED=${REDIS_PERSISTENCE_ENABLED:-false}
export REDIS_PERSISTENCE_ACCESS_MODES=${REDIS_PERSISTENCE_ACCESS_MODES:-ReadWriteOnce}
export REDIS_PERSISTENCE_STORAGE_CLASS=${REDIS_PERSISTENCE_STORAGE_CLASS:-gp2-encrypted}
export REDIS_PERSISTENCE_EXISTING_CLAIM=${REDIS_PERSISTENCE_EXISTING_CLAIM:-}
export REDIS_PERSISTENCE_SIZE=${REDIS_PERSISTENCE_SIZE:-1Gi}
export REDIS_PERSISTENCE_ENABLED=$(echo "${REDIS_PERSISTENCE_ENABLED}" | tr '[:upper:]' '[:lower:]')

kd='kd --timeout 10m --check-interval 5s'
redis_storage_files='kube/redis/redis-pvc.yml'
redis_runtime_files='kube/redis/redis-service.yml -f kube/redis/redis-network-policy.yml -f kube/redis/redis-deployment.yml'

delete_redis() {
  $kd --delete -f ${redis_runtime_files}

  if [[ "${REDIS_PERSISTENCE_ENABLED}" == 'true' && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd --delete -f ${redis_storage_files}
  fi
}

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(cat /root/.dockersock/branch_name.txt)
  export REDIS_PERSISTENCE_ENABLED=false
  export REDIS_PERSISTENCE_ENABLED=$(echo "${REDIS_PERSISTENCE_ENABLED}" | tr '[:upper:]' '[:lower:]')

  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd --delete -f kube/configmaps/configmap.yml
  delete_redis
  $kd --delete -f kube/save-return-data-alerts -f kube/save-return-lookup -f kube/dashboard -f kube/app -f kube/file-vault
  echo "Torn Down UAT Branch - ms-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(echo $DRONE_SOURCE_BRANCH | tr '[:upper:]' '[:lower:]' | tr '/' '-')

if [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  export REDIS_PERSISTENCE_ENABLED=true
  export REDIS_PERSISTENCE_SIZE=10Gi
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  export REDIS_PERSISTENCE_ENABLED=true
  export REDIS_PERSISTENCE_SIZE=1Gi
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  export REDIS_PERSISTENCE_ENABLED=false
elif [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  export REDIS_PERSISTENCE_ENABLED=false
else
  export REDIS_PERSISTENCE_ENABLED=false
fi

export REDIS_PERSISTENCE_ENABLED=$(echo "${REDIS_PERSISTENCE_ENABLED}" | tr '[:upper:]' '[:lower:]')

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/file-vault/file-vault-ingress.yml 
  $kd -f kube/configmaps -f kube/certs
  $kd -f kube/dashboard
  if [[ "${REDIS_PERSISTENCE_ENABLED}" == 'true' && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd -f ${redis_storage_files}
  fi
  $kd -f ${redis_runtime_files}
  $kd -f kube/save-return-data-alerts
  $kd -f kube/save-return-lookup
  $kd -f kube/file-vault
  $kd -f kube/app 
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/file-vault/file-vault-ingress.yml 
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/configmaps/configmap.yml -f kube/save-return-lookup/ingress.yml
  $kd -f kube/dashboard
  if [[ "${REDIS_PERSISTENCE_ENABLED}" == 'true' && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd -f ${redis_storage_files}
  fi
  $kd -f ${redis_runtime_files}
  $kd -f kube/save-return-data-alerts
  $kd -f kube/save-return-lookup
  $kd -f kube/file-vault
  $kd -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/file-vault/file-vault-ingress.yml 
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/configmaps/configmap.yml -f kube/save-return-lookup/ingress.yml
  $kd -f kube/dashboard
  if [[ "${REDIS_PERSISTENCE_ENABLED}" == 'true' && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd -f ${redis_storage_files}
  fi
  $kd -f ${redis_runtime_files}
  $kd -f kube/save-return-data-alerts
  $kd -f kube/save-return-lookup
  $kd -f kube/file-vault 
  $kd -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  export KUBE_CERTIFICATE_AUTHORITY=https://raw.githubusercontent.com/UKHomeOffice/acp-ca/master/acp-prod.crt

  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/file-vault/file-vault-ingress.yml 
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml -f kube/save-return-lookup/ingress.yml
  $kd -f kube/dashboard
  $kd -f kube/govuk-ingress -f kube/app/ingress-external.yml -f kube/app/networkpolicy-external.yml
  if [[ "${REDIS_PERSISTENCE_ENABLED}" == 'true' && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd -f ${redis_storage_files}
  fi
  $kd -f ${redis_runtime_files}
  $kd -f kube/save-return-data-alerts
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
