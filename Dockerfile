# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the app
COPY . .

# Ensure uploads directory exists and has proper permissions
RUN mkdir -p uploads && chmod 755 uploads

# Build the app
RUN pnpm build

# Expose port (default Next.js port)
EXPOSE 3000

# Create startup script
RUN echo '#!/bin/sh\n\
npx prisma migrate deploy\n\
pnpm start' > /app/start.sh && chmod +x /app/start.sh

# Start the app with migrations
CMD ["/app/start.sh"]
