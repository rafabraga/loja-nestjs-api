- Criar migração

typeorm migration:create -n CriandoTabelaTeste -d src/migrations

- Rodar migrações em ambiente local:

ts-node ./node_modules/typeorm/cli.js migration:run --config development.env

- Rodar migrações em ambiente de produção:

ts-node ./node_modules/typeorm/cli.js migration:run