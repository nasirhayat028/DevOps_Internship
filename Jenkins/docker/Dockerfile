# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

# Copy only package.json first (for caching)
COPY ../protfolio/package*.json ./
RUN npm install

# Copy rest of the React app
COPY ../protfolio/ ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output from first stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
