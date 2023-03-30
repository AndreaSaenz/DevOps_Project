FROM node:18-alphine

WORKDIR /src/index

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
