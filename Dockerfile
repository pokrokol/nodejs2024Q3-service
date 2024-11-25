
FROM node:22-alpine3.20 as building

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci

COPY . .

RUN npm run build


FROM node:22-alpine3.20 as prod

WORKDIR /app

COPY --from=building /app .

CMD [ "npm", "run", "start:dev-prisma" ]