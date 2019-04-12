FROM krallin/ubuntu-tini:xenial

EXPOSE 9222

# Install dependencies
RUN apt-get update && \
  apt-get -y upgrade && \
  apt-get install -yq curl libgconf-2-4

# Install Google Chrome
RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb stable main' >> /etc/apt/sources.list.d/google-chrome.list && \
  # the --allow-unauthenticated command is a temporary solution in order to
  # allow chrome to be installed when runnning docker acceptance tests
  apt-get update --allow-unauthenticated && \
  apt-get install -y google-chrome-unstable --no-install-recommends && \
  rm -fr /var/lib/apt/lists/* && \
  # Uninstall Curl, it's configuration files and the installation file from Ubuntu
  apt-get purge --auto-remove -y curl && \
  rm -fr /src/*.deb

COPY entrypoint.sh .
COPY test.png .

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["/usr/local/bin/tini", "--", "./entrypoint.sh"]
