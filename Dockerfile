FROM node:13.12.0-alpine as builder

ARG GIT_TAG
ARG GIT_BRANCH
ARG GIT_REVISION

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY public ./public
COPY src ./src
COPY .env .

ENV NODE_ENV production
ENV NODE_OPTIONS --max_old_space_size=4096

ENV REACT_APP_GIT_TAG=${GIT_TAG}
ENV REACT_APP_GIT_BRANCH=${GIT_BRANCH}
ENV REACT_APP_GIT_REVISION=${GIT_REVISION}

RUN yarn build

FROM busybox
WORKDIR /app
COPY --from=builder /app/build ./
