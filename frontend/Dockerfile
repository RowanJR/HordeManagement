FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY requirements.txt .
RUN npm i requirements.txt

CMD ["npm", "run", "dev"]