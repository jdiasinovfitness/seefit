FROM inovretail.azurecr.io/android-build:3

ARG DEVOPS_FEED_READ_TOKEN
ARG BUILD_BUILDNUMBER
ARG BUILD_BUILDID

ENV BUILD_BUILDID=${BUILD_BUILDID}
ENV BUILD_BUILDNUMBER=${BUILD_BUILDNUMBER}

## Install required dependencies
RUN echo \; begin auth token > /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/PRODUCT_DEVELOPMENT/_packaging/npd/npm/registry/:username=inovretail >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/PRODUCT_DEVELOPMENT/_packaging/npd/npm/registry/:_password=${DEVOPS_FEED_READ_TOKEN} >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/PRODUCT_DEVELOPMENT/_packaging/npd/npm/registry/:email=email >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/PRODUCT_DEVELOPMENT/_packaging/npd/npm/:username=inovretail >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/PRODUCT_DEVELOPMENT/_packaging/npd/npm/:_password=${DEVOPS_FEED_READ_TOKEN} >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/PRODUCT_DEVELOPMENT/_packaging/npd/npm/:email=email >> /root/.npmrc && \
echo \; end auth token >> /root/.npmrc

COPY package.json package-lock.json ./
RUN npm install
COPY . .

ENV MAVEN_OPTS=-Dmaven.wagon.http.pool=false

RUN npm config set env tst && npm run ver android && \
    npm run dist:android && mv ./dist/seeplus.apk /dist/seeplus-tst.apk
