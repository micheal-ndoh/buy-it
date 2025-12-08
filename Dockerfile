# Use a lightweight and compatible base image
FROM node:20-alpine

# Install dependencies needed for Prisma and other native packages
RUN apk add --no-cache openssl libc6-compat python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY prisma ./prisma/

# Enable Corepack for Yarn v4
RUN corepack enable

# Install dependencies
RUN yarn install --immutable

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start command is handled by docker-compose
CMD ["yarn", "dev"]
