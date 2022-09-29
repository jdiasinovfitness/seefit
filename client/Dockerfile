# FROM node:14 as build
# WORKDIR /app

# ## missing devops package authorizations lines

# COPY package.json package-lock.json ./
# ENV NODE_OPTIONS="--max-old-space-size=8192"
# RUN npm install
# ## Copy application code
# #COPY ./cypress ./cypress
# COPY ./src ./src
# COPY angular.json transloco.config.js cypress.config.ts tsconfig.json .prettierignore .prettierrc.json ./
# # RUN npm run cypress:run:test:component ( missing dependences on docker build)
# ## Run build script from package.json#scripts

#Build
FROM node:15 as build

WORKDIR /app



#Deploy
# FROM nginx:1.17.1-alpine

# COPY nginx/nginx.conf /etc/nginx/nginx.conf
# COPY dist/seefit /usr/share/nginx/html


