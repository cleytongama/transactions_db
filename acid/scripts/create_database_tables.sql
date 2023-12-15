-- Cria o banco de dados
CREATE DATABASE ecommerce_db;

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL NOT NULL
);


-- Tabela de Estoque
CREATE TABLE IF NOT EXISTS estoque (
    produto_id INT UNIQUE NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade >= 0),
    CONSTRAINT fk_produto FOREIGN KEY(produto_id) REFERENCES produtos(id)
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    produto_id INT NOT NULL,
    cliente_id INT NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    status VARCHAR(255) DEFAULT 'pendente',
    CONSTRAINT fk_pedido_produto FOREIGN KEY(produto_id) REFERENCES produtos(id)
);

-- Tabela de Faturas
CREATE TABLE IF NOT EXISTS faturas (
    pedido_id INT UNIQUE NOT NULL,
    total DECIMAL NOT NULL CHECK (total >= 0),
    pago BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_fatura_pedido FOREIGN KEY(pedido_id) REFERENCES pedidos(id)
);

-- Tabela de Fidelidade
CREATE TABLE IF NOT EXISTS fidelidade (
    cliente_id INT UNIQUE NOT NULL,
    pontos INT DEFAULT 0 CHECK (pontos >= 0)
);

-- Tabela de Entregas
CREATE TABLE IF NOT EXISTS entregas (
    pedido_id INT UNIQUE NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    status VARCHAR(255) DEFAULT 'preparando',
    CONSTRAINT fk_entrega_pedido FOREIGN KEY(pedido_id) REFERENCES pedidos(id)
);

-----
-- Inserts tables

-- Insere dados na tabela 'produtos'
INSERT INTO produtos (nome, preco) VALUES
('Produto 1', 19.99),
('Produto 2', 29.99),
('Produto 3', 39.99);


-- Insere dados na tabela 'estoque'
INSERT INTO estoque (produto_id, quantidade) VALUES
((SELECT id FROM produtos WHERE nome = 'Produto 1'), 100),
((SELECT id FROM produtos WHERE nome = 'Produto 2'), 100),
((SELECT id FROM produtos WHERE nome = 'Produto 3'), 100);