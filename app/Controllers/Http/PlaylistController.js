'use strict'

const Playlist = use('App/Models/Playlist')
const Helpers = use('Helpers')
const fs = require('fs');
const cloudinary = require('../../../resources/CloudinaryService');

class PlaylistController {

    async index({ request }) {
        const { page } = request.get()
        const playlist = await Playlist.query().with('user').paginate(page)

        return playlist
    }

    async store({ request, response, auth }) {
        const data = request.only(['title', 'description'])

        const upload = request.file('thumbnail')
        if (!!upload) {
            const name = Date.now()
            const fileName = `${name}.${upload.subtype}`
            await upload.move(Helpers.tmpPath('uploads'), {
                name: fileName
            })
            if (!upload.moved()) {
                throw upload.error()
            }

            cloudinary.uploader.upload(`tmp/uploads/${fileName}`, {
                resource_type: "auto",
                public_id: `thumbnail/${name}`,
                chunk_size: 6000000,
                transformation: [
                    { width: 500, height: 500, crop: "limit" }
                ]
            },
                function (error, result) {
                    if (error) throw error
                    //console.log(result, error)
                    fs.unlink(`tmp/uploads/${fileName}`, function (err) {
                        if (err) throw err
                        console.log('File deleted')
                        Playlist.create({ ...data, user_id: auth.user.id, thumbnail: result.url })
                    })
                });
        } else {
            Playlist.create({ ...data, user_id: auth.user.id })
        }
    }

    async show({ params }) {
        const playlist = await Playlist.findOrFail(params.id)

        await playlist.load('user')
        await playlist.load('songs')

        return playlist
    }

    async update({ params, request }) {
        const playlist = await Playlist.findOrFail(params.id)
        const data = request.only(['title', 'description', 'thumbnail'])

        playlist.merge(data)

        await playlist.save()

        return playlist
    }

    async destroy({ params }) {
        const playlist = await Playlist.findOrFail(params.id)

        await playlist.delete()
    }
}

module.exports = PlaylistController
