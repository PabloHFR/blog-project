# Minimum App

![imagem_2023-03-25_171536528](https://user-images.githubusercontent.com/97895946/227739624-44c91349-866a-48b3-98d4-8352fae94d47.png)

![imagem_2023-03-25_171644536](https://user-images.githubusercontent.com/97895946/227739625-721ce980-e91f-4697-854f-cffe4beabac0.png)

O **Minimum App** é um aplicativo feito com ***TypeScript***, ***ReactJS*** e ***NextJS***. Ele é um blog que permite ao usuário assinante ler artigos sobre diversos assuntos. Caso seja apenas um visitante ainda, ele poderá ver apenas uma amostra do conteúdo do artigo. E se desejar tornar-se usuário, poderá se logar com sua conta do GitHub por meio do _NextAuth_ e fazer o pagamento através da plataforma ***Stripe*** com um simples clique.

![imagem_2023-03-25_171737094](https://user-images.githubusercontent.com/97895946/227739622-92549930-1a73-4d6e-b6a7-4fc8600dadc1.png)

Esta aplicação utiliza ***Sass*** na estilização, ***NextAuth*** para o OAuth com GitHub, ***Axios*** para lidar com as requisições HTTP, ***Prismic*** como _Headless CMS_ para a escrita dos artigos, ***Stripe*** para lidar com pagamentos e mandar os webhooks e ***FaunaDB*** como banco de dados para armazenar os dados do usuário e sua autenticação como assinante.

## Features
- O usuário poderá logar no site por meio de sua conta do GitHub.
- O usuário poderá tornar-se assinante efetuando pagamento pela plataforma Stripe com um simples clique.
- O usuário poderá acessar a lista de posts, visualizá-los por completo ou apenas uma amostra, caso não seja assinante.
- O usuário terá seus dados de conta e assinatura armazenados no banco de dados FaunaDB.
- O administrador poderá escrever mais artigos por meio da plataforma Prismic.
- O administrador terá os webhooks do Stripe a respeito de pagamento e cancelamento da conta do usuário ouvidos pela aplicação que automaticamente os registrará no banco de dados.

## Tecnologias Utilizadas
- Sass
- TypeScript
- ReactJS
- NextJS
- NextAuth
- Axios
- Prismic CMS
- Stripe
- FaunaDB

