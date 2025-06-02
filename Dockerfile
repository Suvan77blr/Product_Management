# With server.js as the entry point:

# Base image.
FROM node:20-alpine

# Creating app directory.
WORKDIR /app

# Installing the dependencies.
COPY package*.json ./
RUN npm install --production

# Copying the app source
COPY . .

# Exposing the backend port
EXPOSE 3000

# Cmd to Start the Server.
# CMD [ "npm", "start" ]
CMD sh -c "node BackEnd/Database/seed.js && npm start"
