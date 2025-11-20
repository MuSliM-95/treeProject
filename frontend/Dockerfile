# ---------- Этап 1: сборка ----------
FROM node:20-alpine as build

WORKDIR /app


# Скопируем package.json и установим зависимости
COPY package.json package-lock.json ./

RUN npm ci

#Скопируем остальной код
COPY . .

# Собираем проект
RUN echo "BEFORE_BUILD = $NEXT_PUBLIC_SERVER_URL"

RUN npm run build


# ---------- Этап 2: Запуск ----------

FROM node:20-alpine as runner

WORKDIR /app

# Устанавливаем только production-зависимости
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Копируем сборку и  Нужные файлы из предыдущего этапа
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]