FROM node:16.16

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4001
ENV DATABASE_URL=postgres://postgres:Swasembada01_@db.xmvjldlgrfdohbuvsnsw.supabase.co:6543/postgres
COPY ["package.json","package-lock.json*","./"]

RUN npm install

COPY . .

CMD [ "npm","start" ]