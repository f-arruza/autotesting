FROM node:8.9-alpine

ENV NODE_PATH /install/node_modules/
ENV PATH /install/node_modules/.bin:$PATH

COPY ./package.json /install/package.json
COPY ./processor.js /install/processor.js
COPY ./readlines.js /install/readlines.js

COPY ./entry-point.sh /opt/bin/
RUN chmod +x /opt/bin/entry-point.sh

WORKDIR /install/

RUN apk update && apk add bash
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g && \
  npm install --quiet && \
  apk del native-deps g++ gcc linux-headers make python

VOLUME /app
WORKDIR /app
