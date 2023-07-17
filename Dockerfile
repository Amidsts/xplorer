FROM node:20
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm i
COPY ./build .
EXPOSE 2000
CMD ["node", "app.js"]