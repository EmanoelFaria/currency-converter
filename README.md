# Bem vindo ao conversor de cotações!

O iFood e o grupo movile estão em constante crescimento, com o objetivo de impactar 1 bilhão de pessoas é claro que não se limitaria somente ao Brasil. Por isso para ajudar nessa nova fase de expansão e crescimento desenvolvi um conversor de valores entre moedas.

Assim ao chegar em um novo pais ou região lidar com outra moeda não será mais um problema ;)

## Requisitos

- API Key da [openexchangerates](https://openexchangerates.org).
- [Docker](https://www.docker.com/) versão 18.x
- [Docker Compose](https://docs.docker.com/compose/) versão 1.22+


## Iniciando

Para iniciar o projeto basta clonar o repositório e mover até a branch master.

    $ git clone https://github.com/EmanoelFaria/currency-converter.git
    $ cd currency-converter/
	$ git checkout master

Crie um arquivo chamado `.env` na raiz do projeto e adicione a chave da API da Open Exchanges Rates.
	
	API_KEY_OEX=<sua chave aqui, apenas numeros>

Para iniciar o serviço de conversão basta executar o seguinte comando na raiz do projeto (dependendo da forma que tenha sido instalado o docker/docker-compose o comando sudo deverá ser retirado):

    $ sudo docker-compose up -d 

Para parar o serviço basta executar o seguinte comando:

	$ sudo docker-compose down


### Utilizando a API 

A aplicação disponibiliza um serviço de conversão de valores entre seguintes moedas: `USD,BRL,EUR,BTC,ETH`. Tem como moeda de lastro o Dólar `(USD)`. As moedas disponíveis e lastro podem ser adicionadas/alteradas nos arquivos de configuração.

O serviço de conversão é feito por um request do tipo `GET` no path `/converter` passando os parâmetros abaixo por query string

| Parâmetro  | Descrição |
|--|--|
| amount | valor que deseja converter |
| from | moeda do valor a ser convertido |
| to | moeda destino da conversão |


Exemplo de requisição - *GET* 

```
http://localhost:4000/converter?from=BRL&to=ETH&amount=10
```

Exemplo de resposta:

    
	{
	    "from": "BRL",
	    "to": "ETH",
	    "amount": 10,
	    "result": 0.0019237172
	}


# Arquitetura
### Modelo 1
![arquitetura](imgs/arquitetura1.jpg)

### Modelo 2
![arquitetura_autoscaling](imgs/arquitetura_as.jpg)

A arquitetura escolhida para primeira fase foi a do modelo 1, mas também está pronta para atender o segundo modelo.

## Componentes da arquitetura

#### Worker
O worker é o componente responsável por manter os dados de cotações do banco de dados (nesse caso o redis) atualizados com os dados da API externa (nesse caso a api da Open Exchange). O projeto também está preparado para funcionar com qualquer banco de dados ou api de cotações que estejam dentro do modelo definido.

Ele tem uma rotina de atualização baseada em tempo (minutos), que pode ser alterado nas configurações da aplicação.

Como este não é um processo que precisa se escalado baseado na quantidade de requisições/usuários, é aconselhavel que se tenha pelo menos 2 processos do worker rodando para garantir a disponibilidade dos dados sempre atualizados para nossa API, mesmo que um dos processos sofra falha. (conforme o Modelo 2).

#### Redis
Para criar uma solução que possa ser escalada futuramente, foi utilizado o Redis como banco de dados e servidor cache de nossas cotações. Assim garantimos que com o aumento do número de usuários/requisições teremos uma base sólida para disponibilizar os dados sempre atualizados, sem ter que fazer requisições diretamente API da Open Exchange sempre que consultarem nosso serviço. 

#### API
A api foi desenvolvida pensando em atender no mínimo 1000 requisições por nó por segundo, podendo ser escalada quando necessário. 

Ela também tem uma rotina de atualização de dados, só que diferente do worker não consulta diretamente a API da Open Exchanges e sim o REDIS. 

Para garantir a velocidade de resposta das requisições ela guarda em memória o valor das ultimas cotações, assim ela também não precisa consultar o REDIS sempre que uma nova consulta é feita.


#### Nginx - Load Balancer 

Escolhi utilizar o [*Nginx*](https://www.nginx.com/) como Load Balancer pois é uma solução gratuita ja validada que atenderia muito bem a aplicação. Apesar disso poderiamos utilizar aplicações de terceiros como [*AWS Elastic Load Balancer*](https://aws.amazon.com/pt/elasticloadbalancing/) ou o prório [*Swarm*](https://docs.docker.com/engine/swarm/) do Docker.


# Teste de Stress

Utilizei o [*LoadTest*](https://www.npmjs.com/package/loadtest) para executar os testes. Eles foram feitos em uma EC2 da AWS do tipo `C4.4xlarge` para garantir que não sofreriam influência de outros processos.

### LoadTest
Para rodar o teste de stress com o LoadTest basta executar os seguintes comandos:

	$ sudo npm install -g loadtest
	$ loadtest -n 5000 -c 100 --rps 5000 http://localhost:4000/converter?from=BRL&to=ETH&amount=10

#### Resultados:
![loadtest](imgs/loadtest.png)
