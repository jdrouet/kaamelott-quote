FROM node:alpine

COPY . /code
WORKDIR /code

EXPOSE 8080
CMD ["npm", "start"]

