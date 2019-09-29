FROM node:11.6.0-alpine AS builder
COPY . ./angular
WORKDIR /angular
RUN npm i && npm i node-sass
RUN npm run build:prod

FROM nginx
COPY --from=builder /angular/dist/ /usr/share/nginx/html
EXPOSE 80
