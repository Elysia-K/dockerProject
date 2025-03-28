# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy and install packages
COPY package.json package-lock.json ./
RUN npm install

# Copy project file
COPY . .

# Set environment variables
ENV MONGODB_URI=mongodb://mongo:27017/docker_project

# Build Next.js
RUN npm run build

# Run command
CMD ["npm", "run", "start"]

# Set up port exposure in Dockerfile <- Added
EXPOSE 3000