# Noise-handler
Pacote que implementa técnicas de tratamento de ruído em CRC-8 e Hamming

# Pré requisitos:
  - Node.js
  - NPM Yarn Package

# Instalação:
- Realize o clone do projeto
- Execute o seguinte comando para realizar a instalação:
    ```sh
    $ yarn
    ```
    
# Comandos:
Para codificar um arquivo chame o comando abaixo, o arquivo codificado será incluído no diretório /out com a extensão .ecc
```sh
$ yarn dev encode <file-path>
```

Para decodificar um arquivo chame o comando abaixo, o arquivo decodificado será incluído no diretório /out com a extensão .cod
```sh
$ yarn dev decode <file-path>
```

# Exemplos:
```sh
$ yarn dev encode ./data/alice29.cod
```
```sh
$ yarn dev decode ./out/alice29.ecc
```
