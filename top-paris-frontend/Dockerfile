# Étape 1: Construire le projet Angular
FROM node:20 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2: Servir l'application avec Nginx
FROM nginx:alpine
COPY --from=builder /usr/src/app/dist/top-paris-frontend/browser /usr/share/nginx/html

