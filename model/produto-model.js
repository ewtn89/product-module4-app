const { DataTypes } = require('sequelize');
const { sequelize } = require('../conn/connection');

const Produto = sequelize.define('produto', {
	codigo: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
		unique: true,
	},
	descricao: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	preco: {
		type: DataTypes.DECIMAL,
		allowNull: false,
	},
});

Produto.sync({ alter: true });

module.exports = {
	Produto,
};
