FROM node:22.12.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Add more debugging tools and essentials
RUN apk add --no-cache libc6-compat git curl

WORKDIR /app

# Add more verbose error reporting
RUN echo "Node version: $(node -v)"
RUN echo "NPM version: $(npm -v)"

# Try to enable corepack and show its status
RUN npm install -g corepack && corepack enable || echo "Corepack setup failed, but continuing"

# Copy package files
COPY package.json ./
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# More explicit installation approach with better error handling
RUN if [ -f yarn.lock ]; then \
  echo "Installing with Yarn" && \
  yarn --version && \
  yarn install --frozen-lockfile || yarn install; \
  elif [ -f package-lock.json ]; then \
  echo "Installing with NPM" && \
  npm --version && \
  npm ci || npm install; \
  elif [ -f pnpm-lock.yaml ]; then \
  echo "Installing with PNPM" && \
  npm install -g pnpm && \
  pnpm --version && \
  pnpm install --frozen-lockfile || pnpm install; \
  else \
  echo "No lockfile found. Using NPM to install" && \
  npm install; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build with better error handling
RUN if [ -f yarn.lock ]; then \
  yarn build || echo "Build failed with yarn, trying npm" && npm run build; \
  elif [ -f package-lock.json ]; then \
  npm run build; \
  elif [ -f pnpm-lock.yaml ]; then \
  npm install -g pnpm && pnpm build; \
  else \
  npm run build; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create directories first
RUN mkdir -p public .next
RUN chown nextjs:nodejs .next

# Copy necessary files from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]