# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy only package.json first for caching npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose the port your app listens on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
