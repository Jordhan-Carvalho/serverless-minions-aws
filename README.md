# Serverless Minions Backend

## API

- Todas as rotas estão protegidas pelo Cognito Identity Pool e estão divididas por duas IAM roles distintas (Usuarios logados e não logados)

![API gateway](https://i.ibb.co/8z10rH4/Screenshot-from-2020-11-25-11-21-03.png)

## LAMBDA FUNCTIONS

- signUpConfirm Lambda - Dispara assim que um registro é feito, confirmando o email do usuario automaticamente.

## STEP FUNCTION

- Step function que dispara a cada 20 horas, no primeiro estado de CheckData, ele roda uma lambda que retira informações dos minions na pagina da amazon e compara com as do banco de dados (DynamoDB), se tiver algum minion novo a função UpdateItems roda, ela é um scraper que tira todas informações do novo minion da amazon e adiciona no banco de dados.

![step function](https://i.ibb.co/Js4RsRL/Screenshot-from-2020-11-25-11-16-35.png)
