const fs = require('fs')
const byteToBit = require('./lib/byteToBit')
const crc8 = require('./lib/crc-8')
const log = console.log

if (process.argv.length < 3) {
    throw new Error('Arquivo não informado no parametro da linha de comando')
}

const [fileName] = process.argv.slice(2)

try {
    //array de bits usado para salvar encode do arquivo ecc que sera gerado
    const eccBits = []
    
    //leitura de arquivo retorna array de bytes, o array abaixo é usado para armazenar a correspondencia em bits de cada byte
    const bufferInBits = []

    const buffer = fs.readFileSync(fileName)
    log('fileSize (bytes):', buffer.length)
    
    let bitCount = 0
    buffer.forEach(byte => {
        const bit = byteToBit(byte)
        bitCount += bit.length
        bufferInBits.push(bit)
    })
    log('fileSize (bits):', bitCount)

    const header = bufferInBits.slice(0, 2)
    const crc8Header = crc8.encode(header.join(''))
    eccBits.push(...header, crc8Header)

    console.log(eccBits)

    //TODO: seguir com encode hamming (ir adicionando no eccBits)
    
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