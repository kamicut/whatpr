FROM node:8

# Setup build dependencies
RUN apt-get update \
&& apt-get install -y build-essential wget libxml2-dev libproj-dev libgeos-dev libsqlite3-dev zlib1g-dev pkg-config libspatialite-dev

COPY . /app
WORKDIR /app

RUN rm -rf node_modules
RUN npm install

EXPOSE 8084
CMD ["npm", "start"]