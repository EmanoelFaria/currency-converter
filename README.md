# Bem vindo ao conversor de cotações!

O iFood e o grupo movile estão em constante crescimento, com o objetivo de impactar 1 bilhão de pessoas é claro que não se limitaria somente ao Brasil. Por isso para ajudar nessa nova fase de expansão e crescimento desenvolvi um conversor de valores entre moedas.

Assim ao chegar em um novo pais ou região lidar com outra moeda não será mais um problema ;)

## Requisitos

- API Key da [openexchangerates](https://openexchangerates.org).
- [Docker](https://www.docker.com/) versão 18.x
- [Docker Compose](https://docs.docker.com/compose/) versão 1.22+


## Iniciando

Para iniciar o projeto basta clonar o repositório e mover até a branch develop.

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
