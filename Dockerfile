# Use Node.js base image
FROM node:20

# Set working directory for the backend
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (assuming they are in the root folder)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend code from the BackEnd folder to the working directory
COPY ./BackEnd /usr/src/app/BackEnd

# Expose the backend port (5000)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
