# Use Node LTS
FROM node:lts  

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
ENV PORT=8083
EXPOSE ${PORT}

# Start the app
CMD ["npx", "nodemon", "--watch", ".", "--exec", "npx ts-node app.ts"]