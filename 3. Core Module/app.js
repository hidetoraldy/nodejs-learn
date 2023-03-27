//TODO Core Module
//* File System
const fs = require('fs');

// console.log(fs);

//? menuliskan string ke dalam file secara synchronus
// try {
//     fs.writeFileSync('data/test.txt', 'Hello is this world? synchronus ver.');
// } catch(e) {
//     console.log(e);
// }

//? menuliskan string ke dalam file secara asynchronus
// fs.writeFile('data/test.txt', 'Hello world asynchronus ver.', (e) => {
//     console.log(e);
// });

//? membaca file secara synchronus
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

//? membaca file secara asynchronus
// fs.readFile('data/test.txt', 'utf-8', (e, data) => {
//     if (e) throw e;
//     console.log(data);
// })