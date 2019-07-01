'use strict'


const Route = use('Route')

Route.post('user', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
