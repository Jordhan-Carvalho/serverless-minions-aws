# Serverless Minions Backend

## Tecnologias utilizadas

- NodeJS
- Serverless Framework
- AWS S3
- AWS APIGateway
- AWS Cognito
- AWS DynamoDB
- AWS Lambda
- AWS Step Functions

## API

- Todas as rotas estão protegidas pelo Cognito Identity Pool e estão divididas por duas IAM roles distintas (Usuários logados e não logados)

![API gateway](https://i.ibb.co/8z10rH4/Screenshot-from-2020-11-25-11-21-03.png)

## LAMBDA FUNCTIONS

- signUpConfirm Lambda - Dispara assim que um registro é feito, confirmando o email do usuário automaticamente.

## STEP FUNCTION

- Step function que dispara a cada 20 horas, no primeiro estado de CheckData, ele roda uma lambda que retira informações dos minions na página da amazon e compara com as do banco de dados (DynamoDB), se tiver algum minion novo entra na função UpdateItems, ela é um scraper que tira todas informações do novo minion da amazon e adiciona ele no banco de dados.

![step function](https://i.ibb.co/Js4RsRL/Screenshot-from-2020-11-25-11-16-35.png)

Frontend: https://github.com/Jordhan-Carvalho/serverless-minions-frontend
