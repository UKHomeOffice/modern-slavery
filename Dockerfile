# -----------------------------
# Stage 1: Builder
# -----------------------------
FROM quay.io/ukhomeofficedigital/hof-nodejs:24.22.1_1-alpine@sha256:033927ee2316f3b3c7d22f3560c2e4201c4c751b7cb4664d0d9b9c28783d9473 AS builder

USER root
WORKDIR /app

COPY . /app

RUN yarn install --frozen-lockfile --production

# -----------------------------
# Stage 2: Runtime
# -----------------------------
FROM quay.io/ukhomeofficedigital/hof-nodejs:24.22.1_1-alpine@sha256:033927ee2316f3b3c7d22f3560c2e4201c4c751b7cb4664d0d9b9c28783d9473

USER root

RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

WORKDIR /app

COPY --from=builder --chown=999:998 /app/node_modules /app/node_modules
COPY --from=builder --chown=999:998 /app/. /app

USER 999

HEALTHCHECK --interval=5m --timeout=3s \
 CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
