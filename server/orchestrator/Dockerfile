FROM node:16.16

WORKDIR /orchestrator
ENV NODE_ENV=production
ENV PORT=80
ENV REDIS_PASSWORD=6SIiz9Tz43n5pV25JQKYGKMfWaoV8oua
ENV BASE_URL_USER=http://services-user:4001/
ENV BASE_URL_APP=http://services-app:4002/
COPY ["package.json","package-lock.json*","./"]
RUN npm install

COPY . .

CMD [ "npm","start" ]