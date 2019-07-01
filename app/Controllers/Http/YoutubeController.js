'use strict'

const fs = require('fs');
const ytdl = require('ytdl-core');
const Helpers = use('Helpers')
const ffmpeg   = require('fluent-ffmpeg');

class YoutubeController {
    download({request}){
        const url = request.input('url')

        let stream = ytdl(url, {quality: 'highestaudio'})
        let start = Date.now();
        ffmpeg(stream)
          .audioBitrate(128)
          .save(`tmp/songs/teste.mp3`)
          .on('progress', (p) => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`${p.targetSize}kb downloaded`);
          })
          .on('end', () => {
            console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
          });


        //.pipe(fs.createWriteStream(`tmp/songs/video.mp3`))
    }
}

module.exports = YoutubeController
