# Development stage
FROM node:20-alpine AS development

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./
COPY packages/common/package.json ./packages/common/
COPY apps/client/package.json ./apps/client/

# Install dependencies
RUN yarn install

# Copy source code
COPY packages/common ./packages/common/
COPY apps/client ./apps/client/

WORKDIR /app/apps/client

# Production build stage
FROM development AS build

WORKDIR /app/apps/client

# Build the application
RUN yarn build

# Production stage
FROM nginx:alpine AS production

# Copy built files from build stage to nginx serve directory
COPY --from=build /app/apps/client/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]