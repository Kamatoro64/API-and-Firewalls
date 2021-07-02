FROM node:12.13.0-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY  app.js app.test.js server.js db.js .env.test package.json package-lock.json ./
RUN npm install
RUN chown -R app /opt/app
USER app
EXPOSE 3000
CMD [ "npm", "run", "test" ]
