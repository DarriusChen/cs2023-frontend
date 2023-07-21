FROM node:18.12.1-alpine

WORKDIR /frontend_app

ADD . /frontend_app

RUN npm install

CMD npm run dev