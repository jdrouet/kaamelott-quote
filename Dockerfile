ARG IMAGE_ARCH=amd64
ARG IMAGE_TAG=alpine

FROM ${IMAGE_ARCH}/node:${IMAGE_TAG}

COPY . /code
WORKDIR /code

EXPOSE 80
CMD ["npm", "start"]

