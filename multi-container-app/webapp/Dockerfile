FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# HEALTHCHECK CMD curl http://localhost:3000/ || exit 1
HEALTHCHECK --interval=10s --timeout=3s --retries=3 CMD curl -f http://localhost:3000/health || exit 1


CMD ["npm", "start"]