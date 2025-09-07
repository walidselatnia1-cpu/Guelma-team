# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Build-time args
ARG DATABASE_URL
ARG JWT_SECRET
ARG NODE_ENV=production

# Make them available at build & runtime
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV NODE_ENV=${NODE_ENV}

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the app
COPY . .

# Ensure uploads directory exists
RUN mkdir -p uploads && chmod 755 uploads

# Build Next.js app (with env available)
RUN pnpm build

# Expose port (Next.js default)
EXPOSE 3000

# Create startup script (run migrations before start)
RUN echo '#!/bin/sh\n\
npx prisma migrate deploy\n\
pnpm start' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]
