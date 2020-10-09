FROM node:14.11

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app

RUN yarn --silent

COPY . /app

CMD ["yarn", "start"]