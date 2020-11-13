FROM node:14.11

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN yarn --silent

CMD ["yarn", "start"]