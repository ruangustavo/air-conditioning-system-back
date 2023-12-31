# Base Stage
FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm" \
  PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . .
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile

# Prod-deps Stage
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Build Stage
FROM base AS build
COPY prisma ./prisma/
RUN pnpm run build

# Final Stage
FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

CMD ["pnpm", "start"]
