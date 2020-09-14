const G = '100000111'.split('')

module.exports.encode = bytes => {
    bytes = bytes.padEnd(16, '0')
    return processXOR(bytes.split('')).join('').padStart(8, '0')
}

module.exports.processXOR = processXOR

function processXOR(D) {
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