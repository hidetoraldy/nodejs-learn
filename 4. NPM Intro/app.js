// console.log('Hello is this world?');

const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('hidetoraldy@gmail.com')); 
// console.log(validator.isMobilePhone('087823243090', 'id-ID')); 
// console.log(validator.isNumeric('087823243090')); 

// console.log(chalk.bgMagenta.black('Hello World!'));
const nama = 'Aldy';
const pesan = chalk`Lorem ipsum dolor {bgBlue.black.bold sit amet}, consectetur {bgGreen.italic.black adipisicing} elit. Minus, dolore. the name is ${nama}`;
console.log(pesan);