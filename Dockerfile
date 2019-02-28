ARG IMAGE_ARCH=amd64
ARG IMAGE_TAG=alpine

FROM ${IMAGE_ARCH}/node:${IMAGE_TAG} AS parser

COPY /parser /code
WORKDIR /code

RUN npm install && npm start

FROM ${IMAGE_ARCH}/node:${IMAGE_TAG}

COPY /server /code
COPY --from=parser /code/database.json /code/database.json
WORKDIR /code

EXPOSE 80
CMD ["npm", "start"]
