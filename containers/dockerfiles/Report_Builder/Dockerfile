FROM node:8.11

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
RUN npm install

COPY scripts/ ./scripts/

EXPOSE 8080
