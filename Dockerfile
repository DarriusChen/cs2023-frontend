FROM node:20.9.0-alpine

ENV NODE_ENV=production
##specify app run的環境，有development/production兩種，production可以提升性能

WORKDIR /frontend_app

ADD . /frontend_app

RUN npm install --production

CMD npm run dev