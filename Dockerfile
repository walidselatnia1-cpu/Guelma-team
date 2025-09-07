# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Build-time args
ARG DATABASE_URL
ARG JWT_SECRET
ARG NODE_ENV=production
ARG SKIP_AUTH
ARG REVALIDATE_SECRET
ARG WEBHOOK_SECRET
ARG ADMIN_SECRET
ARG STATIC_EXPORT
ARG MOCK
ARG DB_PASSWORD

# Make them available at build & runtime
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV NODE_ENV=${NODE_ENV}
ENV SKIP_AUTH=${SKIP_AUTH}
ENV REVALIDATE_SECRET=${REVALIDATE_SECRET}
ENV WEBHOOK_SECRET=${WEBHOOK_SECRET}
ENV ADMIN_SECRET=${ADMIN_SECRET}
ENV STATIC_EXPORT=${STATIC_EXPORT}
ENV MOCK=${MOCK}
ENV DB_PASSWORD=${DB_PASSWORD}

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --no-frozen-lockfile

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
