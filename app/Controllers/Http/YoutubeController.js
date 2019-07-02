'use strict'

const fs = require('fs');
const ytdl = require('ytdl-core');

class YoutubeController {
    download({ request }) {
        const data = request.only(['url', 'type'])
        let video
        let filename = Date.now()
        if (data.type === "mp3") {
            video = ytdl(data.url, { filter: 'audioonly', quality: 'highestaudio' })
            video.pipe(fs.createWriteStream(`tmp/songs/${filename}.mp3`))
        } else {
            video = ytdl(data.url, { quality: 'highest' })
            video.pipe(fs.createWriteStream(`tmp/videos/${filename}.${data.type}`))
        }
        video.on('progress', (chunkLength, downloaded, total) => {
            console.log(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
        });
        video.on('end', () => {
            console.log('terminou de baixar')
        });
    }
}

module.exports = YoutubeController
