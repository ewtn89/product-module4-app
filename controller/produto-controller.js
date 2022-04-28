const express = require('express');
const {
	listarProdutos,
	inserirProduto,
	atualizarProduto,
	existeProduto,
	deletarProduto,
} = require('../service/produto-service');

const router = express.Router();

const VALIDA_TUDO = 1;

router.post('/', async (req, res) => {
	try {
		const { codigo, descricao, preco } = req.body;
		console.log(`${codigo} , ${descricao}, ${preco}`);
		validaRequest(codigo, descricao, preco);
		const existeProdutoQtd = await existeProduto(codigo);
		if (existeProdutoQtd) {
			await atualizarProduto(codigo, descricao, preco);
			res.send('Produto atualizado com sucesso.');
		} else {
			await inserirProduto(codigo, descricao, preco);
			res.status(201).send('Produto inserido com sucesso.');
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

router.put('/', async (req, res) => {
	try {
		const { codigo, descricao, preco } = req.body;
		console.log(`${codigo} , ${descricao}, ${preco}`);
		validaRequest(codigo, descricao, preco, VALIDA_TUDO);
		const existeProdutoQtd = await existeProduto(codigo);
		if (existeProdutoQtd) {
			await atualizarProduto(codigo, descricao, preco);
			res.send('Produto atualizado com sucesso.');
		} else {
			res.status(405).send(`Produto de código ${codigo} não encontrado!`);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/', async (req, res) => {
	try {
		res.send(await listarProdutos());
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/', async (req, res) => {
	try {
		const { codigo } = req.body;
		const existeProdutoQtd = await existeProduto(codigo);
		if (existeProdutoQtd) {
			await deletarProduto(codigo);
			res.send('Produto removido com sucesso.');
		} else {
			res.status(405).send(`Produto de código ${codigo} não encontrado!`);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

const validaRequest = (codigo, descricao, preco, opcao) => {
	if (!codigo) {
		throw 'Código não informado';
	}
	if (!descricao) {
		throw 'Descrição não informada';
	}
	if (!preco) {
		throw 'Preço não informado';
	}
};

module.exports = (app) => app.use('/produto', router);
