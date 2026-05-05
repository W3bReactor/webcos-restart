# build stage
FROM node:20-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_HOST
ARG COOKIE_DOMAIN

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST
ENV COOKIE_DOMAIN=$COOKIE_DOMAIN



COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# production stage
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]