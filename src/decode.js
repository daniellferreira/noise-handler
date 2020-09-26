const fs = require('fs')

const crc8 = require('./lib/crc-8')
const { bitsToByte } = require('./lib/binary')

// 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
// 00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 

module.exports = (bufferInBits, fileName) => {
    //verifica se header é válido
    if (!crc8.compare(bufferInBits.slice(0, 16), bufferInBits.slice(16, 24))) {
        throw new Error('Decodificação inválida! O header não é consistente com o byte de verificação.')
    }


    let bitsDecodificado = []
    let bytesDecodificado = []
    function addBitsDecodificados(...elems) {
        bitsDecodificado.push(...elems.map(elem => elem.toString()))
    }

    for (let i = 24; i < bufferInBits.length; i += 6) {
        let bit1 = parseInt(bufferInBits[i], 10)
        let bit2 = parseInt(bufferInBits[i + 1], 10)
        let bit3 = parseInt(bufferInBits[i + 2], 10)
        let bit4 = parseInt(bufferInBits[i + 3], 10)
        let bit5 = parseInt(bufferInBits[i + 4], 10)
        let bit6 = parseInt(bufferInBits[i + 5], 10)
        let bit7 = parseInt(bufferInBits[i + 6], 10)

        //bits 1, 2, 3
        let paridade1Okay = (bit1 + bit2 + bit3) % 2 === bit5
        //bits 2, 3, 4
        let paridade2Okay = (bit2 + bit3 + bit4) % 2 === bit6
        //bits 1, 3, 4
        let paridade3Okay = (bit1 + bit3 + bit4) % 2 === bit7

        //problema na paridade 1 e 2 e paridade 3 ok, altera bit 2
        if (!paridade1Okay && !paridade2Okay && paridade3Okay) {
            console.log(`Bits de paridade 1 e 2 problemáticos, bit 2 alterado de ${bit2} para ${changeBit(bit2)}`)
            bit2 = changeBit(bit2)
        }
        //problema na paridade 1 e 3 e paridade 2 ok, altera bit 1
        if (!paridade1Okay && !paridade3Okay && paridade2Okay) {
            console.log(`Bits de paridade 1 e 3 problemáticos, bit 1 alterado de ${bit1} para ${changeBit(bit1)}`)
            bit1 = changeBit(bit1)
        }
        //problema na paridade 2 e 3 e paridade 1 ok, altera bit 4
        if (!paridade2Okay && !paridade3Okay && paridade1Okay) {
            console.log(`Bits de paridade 2 e 3 problemáticos, bit 4 alterado de ${bit4} para ${changeBit(bit4)}`)
            bit4 = changeBit(bit4)
        }
        //problema nas 3 paridades, altera bit 3
        if (!paridade1Okay && !paridade2Okay && !paridade3Okay) {
            console.log(`Bits de paridade 1, 2 e 3 problemáticos, bit 3 alterado de ${bit3} para ${changeBit(bit3)}`)
            bit3 = changeBit(bit3)
        }

        //se não houve correcao necessária ou após realizar a alteração necessária, adiciona nos bits decodificados
        addBitsDecodificados(bit1, bit2, bit3, bit4)
    }

    for (let i = 0; i < bitsDecodificado.length; i += 8) {
        bytesDecodificado.push(bitsToByte(bitsDecodificado.slice(i, i + 8)))
    }

    const fileOutput = `./out/${fileName}.cod`
    console.log(`file ${fileOutput} size (bytes):`, bytesDecodificado.length)
    console.log(`file ${fileOutput} size (bits):`, bitsDecodificado.length)

    fs.writeFileSync(fileOutput, Buffer.from(bytesDecodificado))
    return fileOutput
}

const changeBit = bit => bit ? 0 : 1