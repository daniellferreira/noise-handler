const G = '100000111'.split('')

module.exports.encode = bytes => {
    //complementa os bits a direita necessarios para o algoritmo
    const bitsToEncode = [...bytes, ...'00000000'.split('')]
    return processXOR(bitsToEncode).join('').padStart(8, '0').split('')
}

module.exports.processXOR = processXOR

function processXOR(D) {
    // console.log(D.join(''))
    const start = D.indexOf('1')

    D = D.slice(start)

    if (G.length > D.length) {
        return D
    }

    for (let i = 0; i < G.length; i++) {
        D[i] = xor(D[i], G[i])
    }

    return processXOR(D)
}

function xor(a, b) {
    return a != b ? '1' : '0';
}