FROM node:24.19.0-alpine3.24@sha256:2a49bdf71e9fd965a58c1703fd9ddd205b34e5782b692a72dd1d248abb0beb43

USER root

# Switch to UK Alpine mirrors, upgrade all installed packages
RUN echo "http://uk.alpinelinux.org/alpine/v3.24/main" > /etc/apk/repositories ; \
    echo "http://uk.alpinelinux.org/alpine/v3.24/community" >> /etc/apk/repositories ; \
    apk upgrade --no-cache 

# Upgrade npm in base image to reduce reported vulnerabilities
RUN npm install -g npm@12.0.2 && npm --version

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app

COPY --chown=999:998 . /app

RUN yarn install --frozen-lockfile --production && \
    yarn run postinstall

HEALTHCHECK --interval=5m --timeout=3s \
CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
