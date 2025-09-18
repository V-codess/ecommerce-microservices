FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npx", "nodemon", "--watch", ".", "--exec", "npx ts-node index.ts"]

