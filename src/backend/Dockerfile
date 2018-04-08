FROM node:slim
RUN mkdir /src
WORKDIR /src
ADD ./package.json /src
ADD ./yarn.lock /src
RUN yarn install
EXPOSE 3001 9229

CMD yarn start