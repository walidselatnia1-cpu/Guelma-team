# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the app
RUN pnpm build

# Expose port (default Next.js port)
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]
