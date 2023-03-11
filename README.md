# Sistema de delivery EnaFood

Este projeto é um sistema de delivery que permite aos usuários comprar produtos e recebe-lôs em seu endereço. Ele inclui um backend em Node.js com banco de dados MongoDB.


# Justificativas das escolhas de projeto e implementação

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose

## Node.js como linguagem de programação

Escolhido por ser uma plataforma de desenvolvimento rápida e de alta performance, adequada para construir aplicações em tempo real e escaláveis

## Typescript como linguagem de programação

TypeScript é uma linguagem de programação que adiciona tipagem estática, permitindo detectar erros em tempo de compilação e oferecendo recursos avançados de programação orientada a objetos

## Express.js como framework

Escolhido por ser um framework leve e flexível para construir aplicações web em Node.js, que oferece recursos como roteamento, middlewares e controle de erros

## MongoDB como banco de dados

Por ser banco de dados NoSQL de alto desempenho e escalabilidade horizontal, adequado para aplicações que precisam armazenar grandes volumes de dados não estruturados

## Mogoose como biblioteca

Simplifica a interação com o banco de dados MongoDB, permitindo a definição de modelos de dados com validação de tipos e campos obrigatórios, facilitando a implementação de operações de CRUD.
Isso torna o desenvolvimento mais produtivo e menos propenso a erros, além de permitir a evolução do schema do banco de dados de forma organizada e controlada.



## Fases do projeto 

- [ ] 1. **MVP**: Fase do desenvolvimento da API, que envolve a criação das funcionalidades básicas para que a aplicação possa ser utilizada pelos usuários;

- [ ] 2. **Early Adopters**: Fase do desenvolvimento da API, que envolve a implementação de novas funcionalidades e a validação do produto por um grupo inicial de usuários;

- [ ] 3. **Early Majority**: Fase do desenvolvimento da API, que envolve a expansão do número de usuários e a consolidação do produto no mercado;

- [ ] 4. **Late Majority**: Fase do desenvolvimento da API, que envolve a manutenção e atualização do produto para atender às necessidades dos usuários existentes e atrair novos usuários.

# Domínio da aplicação

## O domínio da aplicação EnaFood envolve as seguintes entidades:

- User (Usuário): representa um usuário do EnaFood. Possui atributos como nome, e-mail, endereço de entrega.

- Product (Produto): representa um produto disponível para compra no EnaFood. Possui atributos como nome, descrição, preço.

- Order (Pedido): representa um pedido feito por um usuário no EnaFood. Possui atributos como data/hora do pedido, informações de pagamento, endereço de entrega e a lista de produtos pedidos.

- Bag (Sacola): representa o carrinho de compras de um usuário no EnaFood. 

Possui atributos como o usuário associado, a lista de produtos adicionados ao carrinho e as quantidades escolhidas para cada produto.
Essas entidades estão interligadas entre si de acordo com a lógica de negócio do EnaFood e são a base para a implementação da API e do banco de dados.

# Funcionalidades

- Os usuários podem obter listas de produtos disponíveis, e adicionar itens à sacola
- Os usuários podem manipular a sacola(inserir, atualizar quantidades, remover)
- Os usuários podem finalizar o pedido e escolher o endereço de entrega e a forma de pagamento
