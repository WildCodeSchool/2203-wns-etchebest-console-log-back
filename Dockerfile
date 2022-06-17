FROM node:lts

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm i
COPY src src
COPY tsconfig.json tsconfig.json
RUN npx prisma generate
EXPOSE 4000

CMD npm start