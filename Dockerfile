# Stage 1: Build the application
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json to leverage caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build the application (assuming the build output is in the "dist" folder)
RUN npm run build

# Stage 2: Serve the built application using "serve"
FROM node:22-alpine
WORKDIR /app

# Install the "serve" package globally
RUN npm install -g serve

# Copy the built files from the builder stage to the "dist" folder
COPY --from=builder /app/dist ./dist

# Expose port 3000 which will be used by "serve"
EXPOSE 3000

# Start serving the built application using "serve"
CMD ["serve", "-s", "dist", "-l", "3000"]
