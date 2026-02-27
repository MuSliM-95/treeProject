# ---------- BUILD ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# ---------- RUN ----------
FROM node:20-alpine AS runner
WORKDIR /app

# non-root
RUN addgroup -S nodejs && adduser -S appuser -G nodejs
USER appuser

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY src/locales ./dist/src/locales


EXPOSE 9004


CMD ["node", "dist/src/main.js"]
