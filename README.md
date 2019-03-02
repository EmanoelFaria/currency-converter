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
