FROM cypress/base:12 as cypress
RUN npm install
RUN npm run cypress:open:test