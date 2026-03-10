FROM node:20

# install python + yt-dlp
RUN apt-get update && apt-get install -y python3 python3-pip ffmpeg

# install yt-dlp
RUN pip3 install yt-dlp

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node","index.js"]
