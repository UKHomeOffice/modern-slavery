FROM quay.io/ukhomeofficedigital/hof-nodejs:24.19.0-alpine3.24@sha256:a70b2f29d55a9aebcf89690e7f64f4889725dab87a3b22663d102ca17c5f888e  as base

EXPOSE 9222

# Install dependencies
RUN apt-get update && \
  apt-get -y upgrade && \
  apt-get install -yq curl libgconf-2-4

# Install Google Chrome
# the --allow-unauthenticated command is a temporary solution in order to
# allow google chrome to be installed when runnning docker acceptance tests
RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb stable main' >> /etc/apt/sources.list.d/google-chrome.list && \
  apt-get update --allow-unauthenticated && \
  apt-get install -y google-chrome-stable --no-install-recommends --allow-unauthenticated && \
  rm -fr /var/lib/apt/lists/* && \
  # Uninstall Curl, it's configuration files and the installation file from Ubuntu
  apt-get purge --auto-remove -y curl && \
  rm -fr /src/*.deb

COPY entrypoint.sh .
COPY test.png .

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["/bin/sh", "-c", "./entrypoint.sh"]
