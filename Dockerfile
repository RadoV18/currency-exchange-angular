FROM node:14.20-alpine as build

ARG environment=docker

# generate dist
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN ng build --configuration=$environment

# nginx configuration:
FROM nginx:1.17.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/currency-exchange-angular /usr/share/nginx/html
