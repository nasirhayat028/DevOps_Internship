# Use Node.js LTS as base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
