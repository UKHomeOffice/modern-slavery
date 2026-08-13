FROM quay.io/ukhomeofficedigital/hof-nodejs:24.19.0-alpine3.24@sha256:a70b2f29d55a9aebcf89690e7f64f4889725dab87a3b22663d102ca17c5f888e 

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
