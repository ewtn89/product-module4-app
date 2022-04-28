const request = require('supertest');

it('GET - Listar produtos', async () => {
	const response = await request('http://localhost:3000').get('/produto');
	expect(response.status).toBe(200);
});

it('POST - incluir produto', async () => {
	const response = await request('http://localhost:3000')
		.post('/produto')
		.send({
			codigo: 'A1',
			descricao: 'claro de ovo',
			preco: 15,
		});
	expect(response.status).toBe(201);
});

it('POST - atualizar produto existente', async () => {
	const response = await request('http://localhost:3000')
		.post('/produto')
		.send({
			codigo: 'A2',
			descricao: 'claro de ovo',
			preco: 17,
		});
	expect(response.status).toBe(200);
});

it('PUT - Listar produto por id existente', async () => {
	const response = await request('http://localhost:3000').put('/produto').send({
		codigo: 'A1',
		descricao: 'claro de ovo',
		preco: 10,
	});
	expect(response.status).toBe(200);
});

it('DELETE - Deletar produto por id existente', async () => {
	const response = await request('http://localhost:3000')
		.delete('/produto')
		.send({
			codigo: 'A1',
		});
	expect(response.status).toBe(200);
});
