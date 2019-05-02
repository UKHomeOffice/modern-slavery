FROM alpine:3.9.3
# These dependecies are for PDF generation with puppeteer
RUN apk add nodejs npm libxcomposite libxcursor libxdamage libxi libxtst libxscrnsaver libxrandr alsa-lib atk gconf gtk+3.0 && \
    # add a group called 998
    addgroup -S nodejs -g 998 && \
    # add user app
    adduser -S nodejs -G nodejs -u 999 -h /app/ && \
    chown -R 999:998 /app/ && \
    mkdir /public

COPY package.json /app/package.json

WORKDIR /app

RUN npm --loglevel warn install --production  --no-optional
COPY . /app

# Give nodejs user permissions to public and app folders. Nodejs user is set to 999 and the group 998
RUN npm --loglevel warn run postinstall && \
  chown -R 999:998 /public && chown -R 999:998 public && \
  chown -R 999:998 /app/
USER 999

CMD ["/app/run.sh"]
