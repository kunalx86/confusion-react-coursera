FROM node:14.11

WORKDIR /app

COPY ./public /app/public

RUN npm i -g json-server

VOLUME [ "/app/data" ]

CMD ["json-server", "--watch", "./data/db.json", "-d", "2000", "-p", "3001", "--host", "0.0.0.0"]