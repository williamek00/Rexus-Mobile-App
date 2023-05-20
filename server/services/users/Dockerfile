FROM node:16.16

WORKDIR /users
ENV NODE_ENV=production
ENV PORT=4001
ENV MONGO_CONNECTION=mongodb+srv://williamenosk123:Swasembada01_@cluster0.fsmfgyx.mongodb.net/?retryWrites=true&w=majority
COPY ["package.json","package-lock.json*","./"]

RUN npm install

COPY . .

CMD [ "npm","start" ]