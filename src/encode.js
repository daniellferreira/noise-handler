const fs = require('fs')

const crc8 = require('./lib/crc-8')
const { bitsToByte } = require('./lib/binary')

module.exports = (bufferInBits, fileName) => {
    //array de bits usado para salvar encode do arquivo ecc que sera gerado
    const eccBits = []
    //array de bytes que será usado para salvar no arquivo
    const eccBytes = []

    //pega os 16 bits (8 bytes) de cabeçalho
    const header = bufferInBits.slice(0, 16)

    const crc8Header = crc8.encode(header)

    eccBits.push(...header, ...crc8Header)

    for (let i = 16; i < bufferInBits.length; i += 4) {
        const bitUm = parseInt(bufferInBits[i], 10)
        const bitDois = parseInt(bufferInBits[i + 1], 10)
        const bitTres = parseInt(bufferInBits[i + 2], 10)
        const bitQuatro = parseInt(bufferInBits[i + 3], 10)
        let bitCinco = 0, bitSeis = 0, bitSete = 0

        if ((bitUm + bitDois + bitTres) % 2 === 1) {
            bitCinco = 1
        }

        if ((bitDois + bitTres + bitQuatro) % 2 === 1) {
            bitSeis = 1
        }

        if ((bitUm + bitTres + bitQuatro) % 2 === 1) {
            bitSete = 1
        }

        const bitCompleto = [bitUm, bitDois, bitTres, bitQuatro, bitCinco, bitSeis, bitSete].map(elem => elem.toString())

        eccBits.push(...bitCompleto)
    }


    for (let i = 0; i < eccBits.length; i += 8) {
        eccBytes.push(bitsToByte(eccBits.slice(i, i + 8)))
    }

    const fileOutput = `./out/${fileName}.ecc`
    console.log(`file ${fileOutput} size (bytes):`, eccBytes.length)
    console.log(`file ${fileOutput} size (bits):`, eccBits.length)

    fs.writeFileSync(fileOutput, Buffer.from(eccBytes))
    return fileOutput
}