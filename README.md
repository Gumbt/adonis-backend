instalar o cli do adonisjs
npm install -g @adonisjs/cli

adonis new name --api-only
cd name
adonis serve --dev //dev = nodemon

faze mysql db

adonis make:controller User
HTTP requests

adonis route:list //lista as rotas

adonis ja retorna em json

adonis install @adonisjs/mail

npm install moment

adonis make:model File -m -c //faz o model, faz um controller,  migration

adonis make:model Project -m -c
adonis make:model Task -m -c


adonis install @adonisjs/validator
adonis make:validator User
adonis make:ehandler  //capta erros dos controllers e validacao
adonis make:validator Session

adonis make:hook Task


# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
