ARG IMAGE_ARCH=amd64
ARG IMAGE_TAG=alpine

FROM ${IMAGE_ARCH}/node:${IMAGE_TAG}

COPY . /code
WORKDIR /code

HEALTHCHECK --interval=30s --timeout=2s --start-period=1s --retries=3 \
  CMD ["npm", "run", "check"]

EXPOSE 80
CMD ["npm", "start"]

