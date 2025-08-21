# Multi-stage build: build assets with Node, then serve with Nginx

FROM node:20-alpine AS build
WORKDIR /app

# Copy deps first to leverage Docker cache
COPY app/package*.json ./
RUN npm install

# Copy source and build
COPY app .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


