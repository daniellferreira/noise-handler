'use strict'

module.exports.byteToBits = byte => byte.toString(2).padStart(8, '0')

module.exports.bitsToByte = bits => parseInt(bits.join(''), 2)
