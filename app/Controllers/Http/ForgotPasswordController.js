'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
    async store ({ request, response }) {
        try {
            const email = request.input('email')
            const user = await User.findByOrFail('email', email)

            user.token = crypto.randomBytes(10).toString('hex')
            user.token_created_at = new Date()

            await Mail.send(
                ['emails.forgot_password'],
                { email, link: `${request.input('redirect_url')}?token=${user.token}` },
                message => {
                message
                    .to(user.email)
                    .from('diego@rocketseat.com.br', 'Diego | Rocketseat')
                    .subject('Recuperação de senha')
                }
            )

            await user.save()
        } catch (err) {
            return response
                .status(err.status)
                .send({ error: { message: 'Algo não deu certo, esse e-mail existe?' } })
        }
      }
}

module.exports = ForgotPasswordController
