FROM node:16-alpine3.14

WORKDIR /usr/app

RUN npm install -g selenium-session

EXPOSE 3000

CMD [ "selenium-session" ]

# docker build --no-cache -t sessions_server -f .\Dockerfile .
# docker run -v ${PWD}/tests/sessions:/usr/app/sessions -it -p 3000:3000 --rm sessions_server

