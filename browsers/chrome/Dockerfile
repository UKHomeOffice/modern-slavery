#FROM krallin/ubuntu-tini:xenial
#FROM rubensa/ubuntu-tini-dev-chrome
#FROM rubensa/ubuntu-tini-x11
#FROM rubensa/ubuntu-tini-dev-chrome
FROM node:16.16.0 as base

EXPOSE 9222

# Install dependencies
#RUN apt-get update && apt-get install -y --no-install-recommends cron && \
#    rm -r /var/lib/apt/lists/*
RUN apt-get update && \
  apt-get -y upgrade && \
  apt-get install -fyq curl libgconf-2-4
#  libu2f-udev

# Install Google Chrome
# the --allow-unauthenticated command is a temporary solution in order to
# allow google chrome to be installed when runnning docker acceptance tests

#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
#RUN apt-get update && apt-get -y install google-chrome-stable

RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb stable main' >> /etc/apt/sources.list.d/google-chrome.list && \
  apt-get update --allow-unauthenticated && \
  #apt-get upgrade -y --allow-unauthenticated && \
  #apt-get --fix-broken install -y google-chrome-stable --no-install-recommends --allow-downgrades --allow-unauthenticated && \
  apt-get install -y google-chrome-stable --no-install-recommends --allow-unauthenticated && \
  rm -fr /var/lib/apt/lists/* && \
  # Uninstall Curl, it's configuration files and the installation file from Ubuntu
  apt-get purge --auto-remove -y curl && \
  rm -fr /src/*.deb

COPY entrypoint.sh .
COPY test.png .

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["/usr/local/bin/tini", "--", "./entrypoint.sh"]
