#Build
FROM node:15 as build

WORKDIR /app

COPY package.json package-lock.json ./

ENV NODE_OPTIONS="--max-old-space-size=8192"

RUN npm install

COPY ./cypress ./cypress
COPY ./src ./src
COPY angular.json transloco.config.js cypress.config.ts tsconfig.json .prettierignore .prettierrc.json ./


#FROM cypress/base:12 as cypress
#RUN npm install
#RUN npm run cypress:open:test:component

RUN npm run build

#Deploy
FROM nginx:1.17.1-alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY dist/seefit /usr/share/nginx/html
