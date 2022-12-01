const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    Book: sequelize.define('book', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        bookTitle: DataTypes.STRING,
        bookDescription: DataTypes.STRING,
        image: DataTypes.STRING,

    })
}
