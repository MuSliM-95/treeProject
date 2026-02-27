# ---------- Этап 1: сборка ----------
FROM node:20-alpine as build

WORKDIR /app
# Скопируем package.json и установим зависимости
COPY package.json package-lock.json ./



RUN npm ci

ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_GTAG_ID

ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_GTAG_ID=$NEXT_PUBLIC_GTAG_ID

#Скопируем остальной код
COPY . .

# Собираем проект
RUN npm run build


# ---------- Этап 2: Запуск ----------

FROM node:20-alpine as runner

WORKDIR /app

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs

# Копируем сборку и  Нужные файлы из предыдущего этапа
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]