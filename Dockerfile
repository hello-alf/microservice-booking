FROM node:20-alpine3.17

EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json package.json

RUN apk add --no-cache tini

RUN npm install && npm cache clean --force

COPY . . 

RUN npm run build

CMD ["npm", "start"]