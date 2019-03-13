FROM quay.io/ukhomeofficedigital/nodejs-base:v8
RUN yum clean all && yum update -y -q && yum clean all && yum -y upgrade
# These dependecies are for PDF generation with puppeteer
RUN yum install -y libXcomposite libXcursor libXdamage libXi libXtst libXScrnSaver libXrandr alsa-lib atk GConf2 gtk3

RUN mkdir /public

COPY package.json /app/package.json
RUN npm --loglevel warn install --production  --no-optional
COPY . /app

RUN npm --loglevel warn run postinstall
# Give nodejs user permissions to public folder. Nodejs user is set to 999 and the group 998
RUN chown -R 999:998 /public && chown -R 999:998 public

USER 999

CMD ["/app/run.sh"]
