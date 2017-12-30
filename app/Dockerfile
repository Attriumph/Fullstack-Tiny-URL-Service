FROM node:8.9.3

RUN npm install nodemon -g

RUN mkdir -p /app

WORKDIR /app

ADD . /app

RUN cd /app&& npm install

EXPOSE 3000

CMD ["nodemon", "/app/server.js"]