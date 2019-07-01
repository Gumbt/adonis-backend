'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
    user () {
        return this.belongsTo('App/Models/User')//1 projeto pertence a 1 usuario
    }
    tasks () {
        return this.hasMany('App/Models/Task')//1 projeto pode ter varias tarefas
    }
}

module.exports = Project
