FROM quay.io/ukhomeofficedigital/nodejs-base:v8
RUN yum clean all && yum update -y -q && yum clean all && yum -y upgrade
RUN yum install -y libX11 make gcc gcc-c++ krb5-devel git bzip2 ImageMagick fontconfig libXrender libXext xorg-x11-fonts-Type1 xorg-x11-fonts-75dpi freetype libpng zlib libjpeg-turbo wget openssl

RUN wget https://downloads.wkhtmltopdf.org/0.12/0.12.5/wkhtmltox-0.12.5-1.centos7.x86_64.rpm && \
    rpm -Uvh wkhtmltox-0.12.5-1.centos7.x86_64.rpm

RUN mkdir /public

COPY package.json /app/package.json
RUN npm --loglevel warn install --production  --no-optional
COPY . /app
RUN npm --loglevel warn run postinstall
# Give nodejs user permissions to public folder. Nodejs user is set to 999 and the group 998
RUN chown -R 999:998 /public && chown -R 999:998 public

USER 999

CMD ["/app/run.sh"]
