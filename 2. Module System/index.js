// const fs = require('fs'); //? core module
// const cetakNama = require('./coba'); //? local  module
// const moment = require('moment'); //? third party module/npm module/node modules 

// console.log('hello');

// const cetakNama = require('./coba');
// const PI = require('./coba');
const coba = require('./coba');

console.log(
    coba.cetakNama('Aldy'), 
    coba.PI, 
    coba.mahasiswa.cetakMhs(), 
    new coba.Orang
);