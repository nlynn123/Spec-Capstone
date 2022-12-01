const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    SavedBook: sequelize.define('saved_book', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    })
}