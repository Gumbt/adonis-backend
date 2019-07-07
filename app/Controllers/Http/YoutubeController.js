'use strict'

const Song = use('App/Models/Song')
const fs = require('fs');
const ytdl = require('ytdl-core');//baixa video, audio do yt
const searchYt = require('youtube-search');//procura no yt
const cloudinary = require('../../../resources/CloudinaryService');

class YoutubeController {
    async search({ request, response }) {
        const data = request.only(['search', 'maxResults'])
        var opts = {
            maxResults: data.maxResults,
            key: 'AIzaSyDy1velmfau4ecc3olUVZdMCjww47LGxcc'
        };
        const busca = await searchYt(data.search, opts);
        return busca
    }

    async download({ request, response }) {
        const data = request.only(['url', 'type', 'quality', 'playlist'])
        let video
        let filename = Date.now()
        if (data.type === "mp3") {
            video = await ytdl(data.url, { filter: 'audioonly', quality: data.quality })
            video.pipe(fs.createWriteStream(`tmp/uploads/${filename}.${data.type}`))
        } else {
            video = await ytdl(data.url, { quality: data.quality })
            video.pipe(fs.createWriteStream(`tmp/uploads/${filename}.${data.type}`))
        }
        let infoSong
        video.on('info', (info) => {
            infoSong = info
        })
        video.on('progress', (chunkLength, downloaded, total) => {
            console.log(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
        });
        video.on('end', () => {
            console.log('terminou de baixar')
            cloudinary.uploader.upload(`tmp/uploads/${filename}.${data.type}`, {
                resource_type: "auto",
                public_id: `songs/${filename}`,
                chunk_size: 6000000
            },
                function (error, result) {
                    if (error) throw error
                    //console.log(result, error)
                    fs.unlink(`tmp/uploads/${filename}.${data.type}`, function (err) {
                        if (err) throw err
                        console.log('File deleted')
                        Song.create({
                            playlist_id: data.playlist,
                            name: infoSong.title,
                            url: result.url,
                            type: 'audio',
                            subtype: data.type
                        })
                    })
                });
        });
    }
}

module.exports = YoutubeController
