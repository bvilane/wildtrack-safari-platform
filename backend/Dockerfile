# Multi-stage build for efficiency
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# Production stage (used for App Runner deployment)
FROM base AS production
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S wildtrack -u 1001

# Copy application code
COPY --chown=wildtrack:nodejs . .

# Switch to non-root user
USER wildtrack

EXPOSE 5000

# NOTE: This stage is used by AWS App Runner.
# Make sure to set port 5000 in App Runner.
# To build for production use:
#    docker build -t wildtrack-api .
CMD ["npm", "start"]
