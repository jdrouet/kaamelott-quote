FROM node:alpine

COPY . /code
WORKDIR /code

CMD ["npm", "start"]

