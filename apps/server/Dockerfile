# Development stage
FROM node:22 AS development

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./
COPY packages/common/package.json ./packages/common/
COPY apps/server/package.json ./apps/server/

# Install dependencies
RUN yarn install

# Copy source code
COPY packages/common ./packages/common/
COPY apps/server ./apps/server/

WORKDIR /app/apps/server

EXPOSE 3000

CMD ["yarn", "dev"]

# Production stage
FROM node:22 AS production

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./
COPY packages/common/package.json ./packages/common/
COPY apps/server/package.json ./apps/server/

# Install production dependencies only
RUN yarn install --production

# Copy source code
COPY packages/common ./packages/common/
COPY apps/server ./apps/server/

WORKDIR /app/apps/server

EXPOSE 3000

# Set NODE_ENV to production
ENV NODE_ENV=production

CMD ["node", "index.js"]