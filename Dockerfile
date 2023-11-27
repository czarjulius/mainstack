FROM node:alpine

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

ARG MONGO_URI
ARG MONGO_URI_TEST
ARG APP_CONTEXT
ARG PORT
ARG JWT_SECRET
ARG JWT_EXPIRES_IN

ENV MONGO_URI=${MONGO_URI}
ENV MONGO_URI_TEST=${MONGO_URI_TEST}
ENV APP_CONTEXT=${APP_CONTEXT}
ENV PORT=${PORT}
ENV JWT_SECRET=${JWT_SECRET}
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}

WORKDIR /usr/app

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

ENTRYPOINT [ "npm", "start" ]