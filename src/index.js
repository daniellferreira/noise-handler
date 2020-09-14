'use strict'

const fs = require('fs')
const byteToBit = require('./lib/byteToBit')
const log = console.log

if (process.argv.length < 3) {
    throw new Error('Arquivo não informado no parametro da linha de comando')
}

const [fileName] = process.argv.slice(2)

try {
    const buffer = fs.readFileSync(fileName)
    log('fileSize (bytes):', buffer.length)

    let bitCount = 0
    for (let i = 0; i < buffer.length; i++) {
        const byte = buffer[i];
        const bit = byteToBit(byte)
        bitCount += bit.length

        
    }

    log('fileSize (bits):', bitCount)
} catch (err) {
    if (err.code == 'ENOENT') {
        throw new Error('Arquivo não encontrado')
    }
    throw err
}