#!/bin/bash

# Start Google Chrome with the sepcified options and be able to close the
# terminal without destroying the running Chrome session

nohup google-chrome \
	--no-sandbox \
	--disable-background-networking \
	--disable-default-apps \
	--disable-extensions \
	--disable-sync \
	--disable-translate \
	--headless \
	--hide-scrollbars \
	--metrics-recording-only \
	--mute-audio \
	--no-first-run \
	--safebrowsing-disable-auto-update \
	--ignore-certificate-errors \
	--ignore-ssl-errors \
	--ignore-certificate-errors-spki-list \
	--user-data-dir=/tmp \
	--remote-debugging-port=9222 \
	--remote-debugging-address=0.0.0.0 \
	#--proxy-server=http://zap:8090

# chromedriver --whitelisted-ips=''
