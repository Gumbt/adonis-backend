'use strict'


const Route = use('Route')

Route.post('user', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('/files/:id', 'FileController.show')
Route.post('/download', 'YoutubeController.download')
Route.post('/downloadpl', 'YoutubeController.downloadPlaylist')
Route.post('/search', 'YoutubeController.search')

Route.group(() => {
    Route.post('/files', 'FileController.store')

    Route.resource('playlist', 'PlaylistController')
        .apiOnly()
        .validator(new Map([[['playlist.store'], ['Playlist']]]))

    Route.resource('projects', 'ProjectController')
        .apiOnly()
        .validator(new Map([[['projects.store'], ['Project']]]))
    Route.resource('projects.tasks', 'TaskController')
        .apiOnly()
        .validator(new Map([[['projects.tasks.store'], ['Task']]]))
}).middleware(['auth'])

