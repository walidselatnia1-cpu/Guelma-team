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

# Install dependencies and netcat for database connectivity check
COPY package.json  ./
RUN apk add --no-cache netcat-openbsd && \
    npm install -g pnpm && pnpm install --no-frozen-lockfile

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the app
COPY . .

# Ensure uploads directory exists
RUN mkdir -p uploads && chmod 755 uploads

# Expose port (Next.js default)
EXPOSE 3000

RUN chmod +x /app/run.sh

# Expose port (Next.js default)
EXPOSE 3000

CMD ["sh", "/app/run.sh"]