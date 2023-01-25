
FROM node:16

RUN mkdir /deployment
WORKDIR /deployment
ADD ./package.json /deployment
RUN npm config set '@bit:registry' https://node.bit.dev
RUN npm install --only=production

ADD . /deployment

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
