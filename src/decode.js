module.exports = bufferInBits => {
    //verifica se header é válido
    if (!crc8.compare(bufferInBits.slice(0, 16), bufferInBits.slice(16, 25))) {
        throw new Error('Decodificação inválida! O header não é consistente com o byte de verificação.')
    }

    // //TODO: fazer o decode do hamming
    // for (let i = 25; i < bufferInBits.length; i++) {
    //     const paridade1Okay = false
    //     const paridade2Okay = false
    //     const paridade3Okay = false

    //     const bits123Okay = false
    //     const bits234Okay = false
    //     const bits134Okay = false

    //     //Verifica se a primeira paridade esta correta
    //     if ((bufferInBits[i][1] + bufferInBits[i][2] + bufferInBits[i][3]) % 2 === bufferInBits[i][5]) {
    //         paridade1Okay = true
    //     }
    //     //Verifica a segunda
    //     if ((bufferInBits[i][2] + bufferInBits[i][3] + bufferInBits[i][4]) % 2 === bufferInBits[i][6]) {
    //         paridade2Okay = true
    //     }
    //     //Verifica a terceira
    //     if ((bufferInBits[i][1] + bufferInBits[i][3] + bufferInBits[i][4]) % 2 === bufferInBits[i][7]) {
    //         paridade3Okay = true
    //     }

    //     if (paridade1Okay) {
    //         if (paridade2Okay) {

    //         }
    //     }

    //     if (paridade2Okay)
    //         bits134Okay = true

    //     if (paridade3Okay)
    //         bits234Okay = true
    // }
}