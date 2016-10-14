FROM node
COPY . /Project
WORKDIR /Project
RUN npm install
CMD cd /Project