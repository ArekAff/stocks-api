FROM node:20-alpine3.16

WORKDIR /app

COPY package.json package.lock*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "run", "start:debug"]