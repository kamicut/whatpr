FROM node:8

# Setup build dependencies
RUN apt-get update \
&& apt-get install -y build-essential wget libxml2-dev libproj-dev libgeos-dev libsqlite3-dev zlib1g-dev pkg-config libspatialite-dev

COPY . /app
WORKDIR /app

COPY package*.json ./
RUN npm install --strip
RUN npm cache clean --force

EXPOSE 8080
CMD ["npm", "start"]