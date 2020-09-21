const { bitsToByte } = require('./lib/binary')

module.exports = (bufferInBits, fileName) => {
    //verifica se header é válido
    if (!crc8.compare(bufferInBits.slice(0, 16), bufferInBits.slice(16, 25))) {
        throw new Error('Decodificação inválida! O header não é consistente com o byte de verificação.')
    }
    const hammingDecodificado=[]
    //TODO: fazer o decode do hamming
    for (let i = 25; i < bufferInBits.length; i++) {
        const paridade1Okay = false
        const paridade2Okay = false
        const paridade3Okay = false
        //Verifica se a primeira paridade esta correta bits 1, 2, 3
        if ((bufferInBits[i][0] + bufferInBits[i][1] + bufferInBits[i][2]) % 2 === bufferInBits[i][5]) {
            paridade1Okay = true
        }
        //Verifica a segunda bits 2, 3, 4
        if ((bufferInBits[i][1] + bufferInBits[i][2] + bufferInBits[i][3]) % 2 === bufferInBits[i][6]) {
            paridade2Okay = true
        }
        //Verifica a terceira bits 1, 3, 4
        if ((bufferInBits[i][0] + bufferInBits[i][2] + bufferInBits[i][3]) % 2 === bufferInBits[i][7]) {
            paridade3Okay = true
        }
       if (paridade1Okay) {
            if (paridade2Okay) {
               if(paridade3Okay){
                    hammingDecodificado.push([bufferInBits[i][0],bufferInBits[i][3],bufferInBits[i][2],bufferInBits[i][3]])
               }else{
                   //verifica qual o bit em comum e corrige
                   if(bufferInBits[i][3] === 1){
                       bufferInBits[i][3] = 0
                   }
                   if( bufferInBits[i][3] === 0){
                       bufferInBits[i][3] = 1
                   }
                   hammingDecodificado.push([bufferInBits[i][0],bufferInBits[i][3],bufferInBits[i][2],bufferInBits[i][3]])
               }
           }else{
               if(paridade3Okay){
                   //verifica qual o bit em comum e corrige
                   if(bufferInBits[i][2] === 1){
                       bufferInBits[i][2] = 0
                   }
                   if( bufferInBits[i][2] === 0){
                       bufferInBits[i][2] = 1
                   }
                   hammingDecodificado.push([bufferInBits[i][0],bufferInBits[i][1],bufferInBits[i][2],bufferInBits[i][3]])
               }else{
                   //verifica qual o bit em comum e corrige
                   if(bufferInBits[i][2] === 1){
                       bufferInBits[i][2] = 0
                   }
                   if( bufferInBits[i][2] === 0){
                       bufferInBits[i][2] = 1
                   }
                   hammingDecodificado.push([bufferInBits[i][0],bufferInBits[i][1],bufferInBits[i][2],bufferInBits[i][3]])
               }
           }
        }else{
           if (paridade2Okay) {
               if(paridade3Okay){
                   //verifica qual o bit em comum e corrige
                   if(bufferInBits[i][2] === 1){
                    bufferInBits[i][2] = 0
                }
                if( bufferInBits[i][2] === 0){
                    bufferInBits[i][2] = 1
                }
                hammingDecodificado.push([bufferInBits[i][0],bufferInBits[i][1],bufferInBits[i][2],bufferInBits[i][3]])
               }else{
                    //verifica qual o bit em comum e corrige
                    if(bufferInBits[i][0] === 1){
                        bufferInBits[i][0] = 0
                    }
                    if( bufferInBits[i][0] === 0){
                        bufferInBits[i][0] = 1
                    }
                    hammingDecodificado.push([bufferInBits[i][0],bufferInBits[i][3],bufferInBits[i][2],bufferInBits[i][3]])
               }
           }else{
               if(paridade3Okay){
                    //verifica qual o bit em comum e corrige
                    if(bufferInBits[i][1] === 1){
                        bufferInBits[i][1] = 0
                    }
                    if( bufferInBits[i][1] === 0){
                        bufferInBits[i][1] = 1
                    }
                    hammingDecodificado.push([bufferInBits[i][0],bufferInBits[i][1],bufferInBits[i][2],bufferInBits[i][3]])
               }else{
                   //verifica qual o bit em comum e corrige
                   if(bufferInBits[i][2] === 1){
                       bufferInBits[i][2] = 0
                   }
                   if( bufferInBits[i][2] === 0){
                       bufferInBits[i][2] = 1
                   }
                   hammingDecodificado.push([bufferInBits[i][0],bufferInBits[i][1],bufferInBits[i][2],bufferInBits[i][3]])
               }
           }
        }
    }
    for (let i = 0; i < hammingDecodificado.length; i += 8) {
        hammingDecodificado.push(bitsToByte(hammingDecodificado[i]))
    }
    
    const fileOutput = `./out/${fileName}.ecc`
    console.log(`file ${fileOutput} size (bytes):`, hammingDecodificado.length)
    console.log(`file ${fileOutput} size (bits):`, hammingDecodificado.length)

    fs.writeFileSync(fileOutput, Buffer.from(hammingDecodificado))
    return fileOutput
}