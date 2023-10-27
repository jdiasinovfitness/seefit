FROM node:18 as base
ARG DEVOPS_FEED_READ_TOKEN
WORKDIR /app

RUN echo \; begin auth token > /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/npd/npm/registry/:username=inovretail >> /root/.npmrc && \ 
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/npd/npm/registry/:_password=ZXFibmU2N2NzanI2enRyemdrM3p4aXV6dzU2dzYyamdhZWVveTM0dGNteG9tbWRpYnBmcQ== >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/npd/npm/registry/:email=email >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/npd/npm/:username=inovretail >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/npd/npm/:_password=ZXFibmU2N2NzanI2enRyemdrM3p4aXV6dzU2dzYyamdhZWVveTM0dGNteG9tbWRpYnBmcQ== >> /root/.npmrc && \
echo //pkgs.dev.azure.com/inovretail/13f811ff-a4e7-4240-8ac2-06a16252dd80/_packaging/npd/npm/:email=email >> /root/.npmrc && \
echo \; end auth token >> /root/.npmrc

COPY package.json package-lock.json .npmrc ./
RUN npm install --prod

FROM node:16 as test

WORKDIR /app
COPY --from=base /app /app
COPY --from=base /root/.npmrc /root/.npmrc
RUN npm install

COPY . ./
RUN npm run build


FROM node:18-alpine

WORKDIR /i9r/seefit/middleware

COPY --from=test /app/Dockerfile /Dockerfile
COPY --from=base /app .
COPY --from=test /app/dist .

ENV NODE_ENV="production" ENV="PRD" DB=""

CMD [ "node", "server.js" ]