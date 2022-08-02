# Desafio Frontent - Weather App

Este é um projeto feito para a seleção do estágio de desenvolvedor frontend da empresa Letras com o objetivo de fornecer consultas de tempo e clima relacionadas a diversas cidades.

- [Tecnologias](#tecnologias)
- [Rodando o projeto](#rodando-o-projeto)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Funcionalidades da aplicação](#funcionalidades-da-aplicação)
- [Ambiente de testes](#ambiente-de-testes)
- [Considerações finais](#considerações-finais)

## Tecnologias

- [NextJS](https://nextjs.org)
- [Typescript](https://www.typescriptlang.org)
- [styled-components](https://styled-components.com)
- [i18next](https://github.com/i18next/next-i18next)
- [Axios](https://axios-http.com)

## Rodando o projeto

Para rodar o projeto, é necessário ter o
[NodeJS](https://nodejs.org) instalado em sua máquina, de preferência a versão LTS mais recente.

É recomendada a utilização do [Yarn](https://yarnpkg.com) como Package Manager. Caso ainda não tenha instalado, utilize:

```bash
npm install -g yarn
```

- Instalando as dependências

  Para instalar as dependências do projeto, rode o comando `yarn` na pasta raiz.

- Configurações de variáveis de ambiente

  Para a utilização das APIs do projeto, é necessária a configuração das chaves de API de cada uma delas. Caso seja um dos avaliadores, a configuração das variáveis de ambiente já estará pronta sem necessidade de realizar alteração. Caso não, copie o conteúdo do arquivo `.env.example` e cole-o em um novo arquivo `.env.local` na raiz do projeto, onde:

  1. O campo `GOOGLE_MAPS_API_KEY` deve ser preenchido com a chave da API do Google. A chave deve ser habilitada pelo [Google Cloud Console](https://console.cloud.google.com/) e as APIs `Maps Javascript`, `Places` e `Geocoding` devem ser ativadas para completo funcionamento do projeto.
  2. O campo `OPEN_WEATHER_API_KEY` deve ser preenchido com a chave da API [Open Weather](https://openweathermap.org/).

- Rodando em ambiente de desenvolvimento

  Após a instalação das dependências e configuração das variáveis de ambiente, o projeto já está pronto para ser rodado. Para isso, basta executar o seguinte comando na raiz do projeto:

  ```bash
  yarn dev
  ```

- Rodando em ambiente de produção

  Para rodar em ambiente de produção, é necessária a geração da pasta `dist`. Para isso, rode o comando:

  ```bash
  yarn build
  ```

  Logo após, basta rodar:

  ```bash
  yarn start
  ```

## Estrutura de pastas

- Pasta raíz

  Contém arquivos de configuração para determinadas bibliotecas utilizadas no projeto.

  - /public

    Contém arquivos estáticos de imagem e arquivos JSON de tradução a serem utilizados no projeto.

  - /src

    Apresenta todo o código-fonte principal do projeto, é dividida em semi-módulos de organização e representada como `~` na importação de arquivos através do Typescript.

    - /components

      Pasta com os componentes React utilizados na aplicação, onde cada componente é representado por uma pasta filha contento um arquivo `index.tsx` e outro arquivo `styles.ts`. Também apresenta um arquivo `index.ts` na raiz da pasta para lidar com a exportação e importação de todos os componentes em um único arquivo.

    - /contexts

      Pasta contendo os React Contexts utilizados no projeto. Também apresenta um arquivo `ìndex.tsx` para re-exportação de todos os contexts e exportação do componente Context Provider para simplificação.

    - /hooks

      Pasta com os React Hooks personalizados para se utilizar no projeto.

    - /pages

      Pasta com todos os componentes de página da aplicação. Por padrão do NextJS, todos nomes de arquivos e subpastas dessa pasta representam uma rota da aplicação. É configurado para que apenas os arquivos que terminam com `page.tsx` sejam reconhecidos como rotas. A rota `_app` representa um escopo global do App onde tudo que é contido nela será contido em todas as telas da aplicação. Já a rota `_document` é utilizada para setup de scripts, importação de fontes e outros.

    - /services

      Pasta que contém os serviços de API utilizados no projeto, utilizando o Axios para gerenciá-los.

    - /styles

      Pasta com os estilos e temas globais da aplicação.

    - /tests

      Pasta com setups para o ambiente de testes criado com jest.

    - /types

      Pasta contendo arquivos para tipagem e auxílio na linguagem Typescript para facilitar o desenvolvimento.

## Funcionalidades da aplicação

1. Integração com a Places API do Google

   Para realização da pesquisa de cidades na tela inicial da aplicação, é utilizada a [Places Autocomplete API](https://developers.google.com/maps/documentation/javascript/places-autocomplete) com a biblioteca [use-places-autocomplete](https://www.npmjs.com/package/use-places-autocomplete) para React. Quando uma cidade é selecionada, é utilizada a [Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) para buscar a latitude e a longitude do local, e logo após mandar as informações para a outra tela para serem pesquisadas pela API de clima.

2. Busca de clima da cidade por latitude e longitude

   Como já dito antes, a Geocoding API do Google recupera os dados de latitude e longitude da cidade e os envia para a próxima tela da aplicação. A tela seguinte recebe esses dados e os envia para a [Weather API](https://openweathermap.org/api), que retorna as informações do tempo utilizadas na página.

3. Listagem da previsão do tempo para os próximos 5 dias.

   A terceira tela da aplicação é composta pela previsão do tempo para os próximos 5 dias. A requisição da API retorna uma lista de previsões para 5 dias com um intervalo de 3 horas cada. Para organizar a resposta da API, as previsões pertencentes ao mesmo dia são agrupadas, é extraída a menor e a maior temperatura do grupo e a descrição utilizada é a que se encontra na metade das previsões do dia (previsão para às 12h em um dia completo).

4. Conversão de unidades de temperatura

   O app contém a opção de escolha da unidade de temperatura, onde Celsius e Fahrenheit são opções. A funcionalidade foi feita utilizando um React Context, que salva a escolha realizada em um estado global.

5. Intercionalização

   O app se encontra disponível nas linguagens inglês, português do Brasil e espanhol. Para realizar a intercionalização, foi utilizada a biblioteca [next-18next](https://github.com/i18next/next-i18next). O idioma da aplicação é visto em seu domínio, onde português é o idioma padrão, inglês é representado pelo domínio /en e espanhol é representado pelo domínio /es. Os textos do site traduzidos se encontram na pasta `/public/locales`.

6. Server Side Rendering

   O framework NextJS oferece as opções de renderização através do servidor Node que roda com o projeto. Assim, as requisições de API são feitas no lado do servidor, que devolve o HTML renderizado para o lado do cliente já com os dados da requisição.

## Ambiente de testes

Para testagem de componentes, páginas e funcionalidades no projeto, foi criado um ambiente de testes utilizando [Jest](https://jestjs.io). A pasta `src/tests` contém o setup do ambiente e os testes unitários se encontram junto aos módulos testados nas pastas `__tests__`. Para rodar todos os testes, use o seguinte comando:

```bash
yarn test
```

## Considerações finais

O projeto se encontra disponível no site [weather.adisson.me](https://weather.adisson.me) em formato de produção. Caso haja dúvidas, deixo disponível o email para contato `adissonmprtejo@gmail.com`.
