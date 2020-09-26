require('./prototypes')

const fs = require('fs')
const { byteToBits } = require('./lib/binary')
const log = console.log
const encode = require('./encode')
const decode = require('./decode')

if (process.argv.length < 3) {
    throw new Error('Arquivo não informado no parametro da linha de comando')
}

const OPERATIONS = Object.freeze({
    ENCODE: 'encode',
    DECODE: 'decode'
})

const [op, filePath] = process.argv.slice(2)

if (![OPERATIONS.ENCODE, OPERATIONS.DECODE].includes(op)) throw new Error(`Operação inválida, envie 'encode' ou 'decode'`)

let fileName = ''
try {
    fileName = filePath.split('/')
    fileName = fileName[fileName.length - 1].split('.')[0]
} catch (err) {
    throw new Error('Arquivo inválido')
}

try {
    //leitura de arquivo retorna array de bytes, o array abaixo é usado para armazenar a correspondencia em bits de cada byte
    const bufferInBits = []

    const buffer = fs.readFileSync(filePath)
    log(`file ${filePath} size (bytes):`, buffer.length)

    buffer.forEach(byte => {
        bufferInBits.push(...byteToBits(byte))
    })
    log(`file ${filePath} size (bits):`, bufferInBits.length)

    let outputFile = ''
    switch (op) {
        case OPERATIONS.ENCODE:
            outputFile = encode(bufferInBits, fileName)
            break
        case OPERATIONS.DECODE:
            decode(bufferInBits, fileName)
            break
        default:
            throw new Error(`Operação inválida, envie 'encode' ou 'decode'`)
    }

    log(`Operação de ${op} realizada com sucesso. Arquivo gerado: ${outputFile}`)

    //TODO: criar função que converte array de bits em array de bytes

    //TODO: gravar array de bytes gerado como arquivo .ecc

    //TODO: fazer decode e validações do arquivo .ecc

    // TODO: verificar se arquivo .cod recebido inicialmente é o mesmo gerado no decode
} catch (err) {
    if (err.code == 'ENOENT') {
        throw new Error('Arquivo não encontrado')
    }
    throw err
}