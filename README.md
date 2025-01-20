# Weather App

Este é um aplicativo simples de clima que permite aos usuários verificar as condições meteorológicas em diferentes cidades ao redor do mundo. Ele utiliza a API do OpenWeatherMap para obter informações sobre a temperatura, umidade, velocidade do vento e condições climáticas atuais.

## Funcionalidades

- Pesquisa de clima por cidade.
- Exibe temperatura em Celsius, umidade e velocidade do vento.
- Mostra o ícone representando a condição climática (sol, nuvens, chuva, etc.).
- Exibe uma mensagem de erro caso a cidade não seja encontrada ou o nome seja inválido.

## Tecnologias Utilizadas

- **HTML**: Estrutura do aplicativo.
- **CSS**: Estilização da interface.
- **JavaScript**: Lógica do app e interação com a API.
- **API**: OpenWeatherMap (https://openweathermap.org/) para obter as informações do clima.

## Como Usar

1. Clone este repositório ou baixe os arquivos do projeto.
2. Abra o arquivo `index.html` em seu navegador.
3. Insira o nome de uma cidade na barra de pesquisa e clique no botão de busca.
4. O clima da cidade será exibido, incluindo a temperatura, umidade, vento e um ícone correspondente à condição climática.

## Exemplo de Uso

Ao digitar "London" no campo de pesquisa, o app exibirá informações como:

- Nome da cidade: Londres
- Temperatura: 15°C
- Umidade: 78%
- Velocidade do vento: 10 km/h
- Ícone correspondente ao clima (nuvens, chuva, etc.)

## Como Funciona

- O app faz uma requisição HTTP para a API do OpenWeatherMap usando o nome da cidade fornecido.
- A resposta da API é usada para exibir as informações sobre o clima da cidade solicitada.
- O ícone climático é alterado dependendo da condição do tempo (nuvens, sol, chuva, etc.).
- Em caso de erro (cidade não encontrada ou outros problemas), uma mensagem de erro é exibida.

## Configuração

1. **Chave de API**: Para usar a API do OpenWeatherMap, você precisará de uma chave de API. Crie uma conta gratuita no [OpenWeatherMap](https://openweathermap.org/) e obtenha a sua chave. Substitua a chave de API no código com a sua chave pessoal.

```js
const apiKey = "SUA_CHAVE_AQUI";
