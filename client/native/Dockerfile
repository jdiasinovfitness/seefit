FROM inovretail.azurecr.io/android-build:4

ARG ENV
ARG DEVOPS_FEED_READ_TOKEN
ARG BUILD_BUILDNUMBER
ARG BUILD_BUILDID

ENV ENV=${ENV:-dev}
ENV BUILD_BUILDID=${BUILD_BUILDID}
ENV BUILD_BUILDNUMBER=${BUILD_BUILDNUMBER}


## Install required dependencies
RUN echo \; begin auth token > /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/inov/npm/registry/:username=inovretail >> /root/.npmrc && \ 
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/inov/npm/registry/:_password=${DEVOPS_FEED_READ_TOKEN} >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/inov/npm/registry/:email=email >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/inov/npm/:username=inovretail >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/inov/npm/:_password=${DEVOPS_FEED_READ_TOKEN} >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/inov/npm/:email=email >> /root/.npmrc && \
echo \; end auth token >> /root/.npmrc

COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm config set env $ENV
RUN npm run ver android
RUN npm run dist:android
