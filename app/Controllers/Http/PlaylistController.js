'use strict'

const Playlist = use('App/Models/Playlist')

class PlaylistController {

    async index({ request }) {
        const { page } = request.get()
        const playlist = await Project.query().with('user').paginate(page)

        return playlist
    }

    async store({ request, response, auth }) {
        const data = request.only(['title', 'description', 'thumbnail'])

        const playlist = await Playlist.create({ ...data, user_id: auth.user.id })

        return playlist
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
