FROM node
WORKDIR /heartbeat
COPY package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 3004
CMD ["node","index.js"]
