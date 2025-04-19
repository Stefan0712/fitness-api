# Use an official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the port your app listens on (change if needed)
EXPOSE 4000

# Start the server
CMD ["node", "src/server.js"]
