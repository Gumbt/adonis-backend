'use strict'

const fs = require('fs');
const ytdl = require('ytdl-core');
const cloudinary = require('../../../resources/CloudinaryService');

class YoutubeController {
    async download({ request, response }) {
        const data = request.only(['url', 'type', 'quality', 'begin'])
        let video
        let filename = Date.now()
        if (data.type === "mp3") {
            video = await ytdl(data.url, { filter: 'audioonly', quality: data.quality })
            video.pipe(fs.createWriteStream(`tmp/uploads/${filename}.${data.type}`))
        } else {
            video = await ytdl(data.url, { quality: data.quality })
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
            cloudinary.uploader.upload(`tmp/uploads/${filename}.${data.type}`, {
                resource_type: "auto",
                public_id: `songs/${filename}`,
                chunk_size: 6000000 },
            function(error, result) {
                console.log(result, error)
            });
        });
    }
}

module.exports = YoutubeController
