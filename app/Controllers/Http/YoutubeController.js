'use strict'

const fs = require('fs');
const ytdl = require('ytdl-core');

class YoutubeController {
    async download({ request }) {
        const data = request.only(['url', 'type', 'quality', 'begin'])
        let video
        let filename = Date.now()
        if (data.type === "mp3") {
            video = await ytdl(data.url, { filter: 'audioonly', quality: data.quality })
            video.pipe(fs.createWriteStream(`tmp/uploads/${filename}.mp3`))
        } else {
            video = ytdl(data.url, { quality: data.quality })
            video.pipe(fs.createWriteStream(`tmp/uploads/${filename}.${data.type}`))
        }
        video.on('info', (info) => {
            console.log(info.title)
        })
        video.on('progress', (chunkLength, downloaded, total) => {
            console.log(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
        });
        video.on('end', () => {
            console.log('terminou de baixar')
        });
    }
}

module.exports = YoutubeController
