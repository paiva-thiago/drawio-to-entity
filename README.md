<h1 align="center">drawio-to-entity 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/paiva_thiago" target="_blank">
    <img alt="Twitter: paiva_thiago" src="https://img.shields.io/twitter/follow/paiva_thiago.svg?style=social" />
  </a>
</p>

> Um conversor do XML gerado no https://www.diagrams.net para o Entity Framework

## Importante

**O xml exportado nesta ferramenta online deve estar com a opção 'Compactado' desmarcada!**

## Como usar

Clone este repositório ou, se tiver npm instalado

```sh
npx degit paiva-thiago/drawio-to-entity
```

### E aí?

1. Coloque o xml na pasta xml,

2. Especifique os nomes das entidades em params/entityNames.json,

3. Especifique também no params/props.json o namespace das Entities em `namespace`,  o nome do xml (sem extensão) em `dirXmlFile` e caso as Entidades importem algo, a lista dos usings em `usingList`.

Após isto, basta um
```sh
node index
```

e *voilá*!

## Author

👤 **Thiago Paiva**

* Website: http://thiagopaiva.me
* Twitter: [@paiva\_thiago](https://twitter.com/paiva\_thiago)
* Github: [@paiva-thiago](https://github.com/paiva-thiago)


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_