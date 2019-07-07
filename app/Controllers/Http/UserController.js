'use strict'

const User = use('App/Models/User')
const Helpers = use('Helpers')
const fs = require('fs');
const cloudinary = require('../../../resources/CloudinaryService');

class UserController {
    async store({ request }) {
        const data = request.only(['username', 'email', 'password'])

        const upload = request.file('avatar')
        const name = Date.now()
        const fileName = `${name}.${upload.subtype}`

        await upload.move(Helpers.tmpPath('uploads'), {
            name: fileName
        })
        if (!upload.moved()) {
            throw upload.error()
        }

        const result = await cloudinary.uploader.upload(`tmp/uploads/${fileName}`, {
            resource_type: "auto",
            public_id: `avatars/${name}`,
            chunk_size: 6000000
        });
        fs.unlinkSync(`tmp/uploads/${fileName}`)
        const user = await User.create({ ...data, avatar: result.url })

        return user
    }
}

module.exports = UserController
