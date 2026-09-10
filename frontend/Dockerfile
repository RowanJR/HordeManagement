FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

#this may not work, test before using, no requirements have been tested with it yet
#COPY requirements.txt .
#RUN npm i requirements.txt

CMD ["npm", "run", "dev"]