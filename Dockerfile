FROM node:20-alpine3.17

WORKDIR /usr/src/app

COPY package.json package.json

RUN apk add --no-cache tini

RUN npm install

COPY . . 

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "sleep 120 && npm start"]