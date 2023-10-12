#Build
FROM node:18 as build
ARG DEVOPS_FEED_READ_TOKEN
WORKDIR /app

## Install required dependencies
RUN echo \; begin auth token > /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/inov/npm/registry/:username=inovretail >> /root/.npmrc && \ 
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/inov/npm/registry/:_password=${DEVOPS_FEED_READ_TOKEN} >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/inov/npm/registry/:email=email >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/inov/npm/:username=inovretail >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/inov/npm/:_password=${DEVOPS_FEED_READ_TOKEN} >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/inov/npm/:email=email >> /root/.npmrc && \
echo \; end auth token >> /root/.npmrc

COPY package.json package-lock.json .npmrc ./

ENV NODE_OPTIONS="--max-old-space-size=8192"

RUN npm install

COPY ./src ./src
COPY angular.json  tsconfig.app.json tsconfig.json ./


#FROM cypress/base:12 as cypress
#RUN npm install
#RUN npm run cypress:open:test:component

RUN npm run build

#Deploy
FROM nginx:1.23-alpine
RUN rm -rf /usr/share/nginx/html/*

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/www /usr/share/nginx/html