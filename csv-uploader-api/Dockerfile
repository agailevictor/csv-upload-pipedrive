# Use offical node image
FROM node:alpine
# Work in /usr/app/ directory
WORKDIR /usr/app/

# Copy source files
COPY ./ ./

# Expose node port
EXPOSE ${SERVER_PORT}

# Install dependencies
RUN npm install

#run application
CMD ["npm", "start"]