FROM node:lts-alpine AS deps

ENV NODE_ENV development

WORKDIR /tmp/app

COPY package*.json ./

RUN npm install

FROM node:lts-alpine

ENV NODE_ENV production

WORKDIR /home/node

COPY --from=deps --chown=node /tmp/app/node_modules ./node_modules
COPY --chown=node package*.json ./
COPY --chown=node ./app.mjs ./

RUN npm prune

ENV PORT 1234

EXPOSE ${PORT}

USER node

CMD [ "node", "app.mjs" ]
