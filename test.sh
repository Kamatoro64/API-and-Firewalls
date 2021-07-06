# For testing we reomve the volume each time
# Do not do this for production
docker-compose down --volume

# Build images
docker-compose build 

# Start containers
docker-compose up -d 

# Run unit tests. RUN = npm run test = jest in node container
docker-compose run node-app
