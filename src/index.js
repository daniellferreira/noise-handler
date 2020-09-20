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
        bufferInBits.push(...bit.split(''))
    })
    log('fileSize (bits):', bitCount)

    //pega os 16 bits (8 bytes) de cabeçalho
    const header = bufferInBits.slice(0, 16)    

    const crc8Header = crc8.encode(header)

    eccBits.push(...header, ...crc8Header)

    console.log('header com crc8:',eccBits.join(''))

    //TODO: seguir com encode hamming (ir adicionando no eccBits)
    for(let i= 16; i< bufferInBits.length; i++){
        const bitUm = bufferInBits.slice(i,i+1)
        const bitDois = bufferInBits.slice(i,i+2)
        const bitTres = bufferInBits.slice(i,i+3)
        const bitQuatro = bufferInBits.slice(i,i+4)

        if((bitUm+bitDois+bitTres)%2===0){
            const bitCinco = 0
        }else{
            const bitCinco = 1
        }

        if((bitDois+bitTres+bitQuatro)%2===0){
            const bitSeis = 0
        }else{
            const bitSeis = 1
        }

        if((bitUm+bitTres+bitQuatro)%2===0){
            const bitSete = 0
        }else{
            const bitSete = 1
        }

        const bitEncoded = [bitUm, bitDois,bitTres,bitQuatro,bitCinco,bitSeis,bitSete]
        eccBits.push(bitEncoded)
    }

    //TODO: fazer o decode do hamming
    for(let i =25; i< eccBits.length;i++){
        
    }

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