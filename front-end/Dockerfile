FROM node:12.18 as build

WORKDIR /src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/app/build /usr/share/nginx/html
