FROM node:14.17.6-alpine3.11 as prod

WORKDIR /var/www/html/nest

COPY . .

RUN npm i

CMD [ "npm", "run" ,"start:prod" ]

FROM prod as dev

CMD [ "npm", "run" ,"start:dev" ]
