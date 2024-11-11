FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY docker-entrypoint.sh /usr/src/app/
RUN chmod +x /usr/src/app/docker-entrypoint.sh

EXPOSE 3000

CMD ["/usr/src/app/docker-entrypoint.sh"]