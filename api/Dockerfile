FROM reidweb1/node-typescript:1.0.0

WORKDIR /usr/src/api

COPY ./package*.json ./

ENV NODE_ENV=development

RUN npm install

COPY . .

RUN tsc

CMD [ "node", "bin/www" ]