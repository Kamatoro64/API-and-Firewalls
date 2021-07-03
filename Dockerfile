FROM node:latest
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser --system --group app
COPY  app.js app.test.js server.js db.js .env.test package.json package-lock.json ./
RUN npm install
RUN chown -R app /opt/app
USER app
#EXPOSE 3000 // Currently jest will use an ephemeral port so no explicit expose or publish (docker-compose.yml required)
CMD [ "npm", "run", "test" ]
