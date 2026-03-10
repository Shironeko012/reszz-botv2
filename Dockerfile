FROM node:20

# install python + yt-dlp + ffmpeg
RUN apt-get update && apt-get install -y python3 yt-dlp ffmpeg

# buat alias python
RUN ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"]
