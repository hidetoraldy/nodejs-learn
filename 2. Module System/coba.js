function cetakNama(nama){
    return `Halo nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
    nama : 'Aldy Ramadhan',
    umur : 24,
    cetakMhs() {
        return `Hai, nama saya ${this.nama} dan saya berumur ${this.umur} tahun.`;
    }
}

class Orang {
    constructor() {
        console.log('Objek orang berhasil dibuat!');
    }
}

// module.exports.cetakNama    = cetakNama;
// module.exports.PI           = PI;
// module.exports.mahasiswa    = mahasiswa;
// module.exports.Orang        = Orang;

module.exports = {
    cetakNama,
    PI,
    mahasiswa,
    Orang
}