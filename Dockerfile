FROM node:22

WORKDIR /app

# copy everything from this directory to the container work directory
COPY . . 

RUN npm install

CMD ["npm", "start"]