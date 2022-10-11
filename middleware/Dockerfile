FROM node:15 as base
WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm install --prod

FROM node:15 as test

WORKDIR /app
COPY --from=base /app /app
COPY --from=base /root/.npmrc /root/.npmrc
RUN npm install

COPY . ./
RUN npm run build


FROM node:15-alpine

WORKDIR /i9r/seefit/middleware

COPY --from=test /app/Dockerfile /Dockerfile
COPY --from=base /app .
COPY --from=test /app/dist .

ENV NODE_ENV="production" ENV="PRD" DB=""

CMD [ "node", "server.js" ]