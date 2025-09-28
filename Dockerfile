# Use official Node.js image
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code (for production builds; for dev, we use volumes)
COPY . .

# Default command (can be overridden by docker-compose)
CMD ["npm", "run", "dev"]
