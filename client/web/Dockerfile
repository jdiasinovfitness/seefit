#Build
FROM node:18 as build
ARG DEVOPS_FEED_READ_TOKEN
WORKDIR /app

RUN echo \; begin auth token > /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/PRODUCT_DEVELOPMENT/_packaging/npd/npm/registry/:username=inovretail >> /root/.npmrc && \ 
echo //pkgs.dev.azure.com/inovretail/PRODUCT_DEVELOPMENT/_packaging/npd/npm/registry/:_password=${DEVOPS_FEED_READ_TOKEN} >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/PRODUCT_DEVELOPMENT/_packaging/npd/npm/registry/:email=email >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/PRODUCT_DEVELOPMENT/_packaging/npd/npm/:username=inovretail >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/PRODUCT_DEVELOPMENT/_packaging/npd/npm/:_password=${DEVOPS_FEED_READ_TOKEN} >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/PRODUCT_DEVELOPMENT/_packaging/npd/npm/:email=email >> /root/.npmrc && \
echo \; end auth token >> /root/.npmrc

COPY package.json package-lock.json ./

ENV NODE_OPTIONS="--max-old-space-size=8192"

RUN npm install

COPY ./cypress ./cypress
COPY ./src ./src
COPY angular.json transloco.config.js cypress.config.ts tsconfig.app.json tsconfig.json .prettierignore .prettierrc.json ./


#FROM cypress/base:12 as cypress
#RUN npm install
#RUN npm run cypress:open:test:component

RUN npm run build

#Deploy
FROM nginx:1.23-alpine
RUN rm -rf /usr/share/nginx/html/*

COPY nginx/nginx.conf /etc/nginx/nginx.conf

#COPY --from=build /app/dist /usr/share/nginx/html