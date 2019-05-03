FROM node:10.15-slim

RUN apt-get update && \
    # See https://crbug.com/795759
    apt-get install -yq libgconf-2-4 && \
    # Install latest chrome dev package, which installs the necessary libs to
    # make the bundled version of Chromium that Puppeteer installs work.
    apt-get install -y wget --no-install-recommends && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install -y google-chrome-unstable --no-install-recommends && \
    addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/ && \
    mkdir /public

COPY package.json /app/package.json

WORKDIR /app

RUN npm --loglevel warn install --production  --no-optional
COPY . /app

# Give nodejs user permissions to public and app folders. Nodejs user is set to 999 and the group 998
RUN npm --loglevel warn run postinstall && \
    chown -R 999:998 /public && \
    chown -R 999:998 public && \
    chown -R 999:998 /app/ && \
    # ensure user can exec the chrome binaries installed into the puppeteer directory
    chown -R 999:998 /app/node_modules/puppeteer

USER 999

CMD ["/app/run.sh"]
