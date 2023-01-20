FROM node:18.12.1-alpine
COPY . /usr/src

WORKDIR /usr/src

RUN npm i knex -g

CMD [ "npm", "run", "dev" ]

EXPOSE 5000

