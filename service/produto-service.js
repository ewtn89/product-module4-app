const { Produto } = require('../model/produto-model');

const listarProdutos = async () => {
	return Produto.findAll();
};

const existeProduto = async (codigo) => {
	return Produto.findOne({
		where: {
			codigo,
		},
	});
};

const atualizarProduto = async (codigo, descricao, preco) => {
	return Produto.update({ descricao, preco }, { where: { codigo } });
};

const inserirProduto = async (codigo, descricao, preco) => {
	await Produto.create({ codigo, descricao, preco });
};

const deletarProduto = async (codigo) => {
	await Produto.destroy({
		where: {
			codigo,
		},
	});
};

module.exports = {
	listarProdutos,
	atualizarProduto,
	inserirProduto,
	deletarProduto,
	existeProduto,
};
