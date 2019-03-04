# Specify base image 
FROM node:alpine

WORKDIR /app

# Install dependencies
COPY . .
RUN npm install

# Default command
CMD ["npm", "start"]