# Multi-stage Builds smaller,faster, and more consistent and secure image
# In a multi-stage build, you're actually creating multiple separate images and only exporting what you explicitly copy from one stage to the next
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Use npm ci install dependencies base on package-lock.json, faster and guarantee the consistency of the dependencies
RUN npm ci

# copy everything from this directory to the container work directory
COPY . .

RUN npm run build

# Production stage
# Docker only keeps the FINAL stage in your image
FROM node:22-alpine

WORKDIR /app

# Install curl in the final image (for healthcheck in docker-compose.yml)
RUN apk add --no-cache curl

COPY package*.json ./

# --omit=dev means: omit or skip dev dependencies 
# --only=production is the alternative
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 4750

CMD ["npm", "start"]
