const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'hidetoraldy';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((error, client) => {
    if(error) {
        return console.log('Koneksi gagal!');
    } 

    //* Pilih database
    const db = client.db(dbName);

    //? Menambahkan 1 data kedalam collection mahasiswa
    // db.collection('mahasiswa').insertOne({
    //     nama: 'Aldy',
    //     email: 'aldy@gmail.com'
    // },
    // (error, result) => {
    //     if (error) {
    //         return console.log('gagal menambahkan data');
    //     }

    //     console.log(result);
    // })

    //? Menambahkan lebih dari 1 data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: 'Aldy',
    //             email: 'aldy@yahoo.com'
    //         },
    //         {
    //             nama: 'Ramadhan',
    //             email: 'ramadhan@gmail.com'
    //         }
    //     ],
    //     (error, result) => {
    //         if (error) {
    //             return console.log('gagal menambahkan data');
    //         }

    //         console.log('berhasil menambahkan data!');
    //     }
    // );

    //? Menampilkan semua data yang ada didalam collection mahasiswa
    // db.collection('mahasiswa').find().toArray((error, result) => {
    //     console.log(result);
    // });

    //? Menampilkan data berdasarkan id/nama yang ada didalam collection mahasiswa
    // db.collection('mahasiswa').find({ nama: 'Aldy' }).toArray((error, result) => {
    //     console.log(result);
    // });
    // db.collection('mahasiswa').find({ _id: ObjectID('64fe93ea3a5a263ea4a8052f') }).toArray((error, result) => {
    //     console.log(result);
    // });

    //? Mengubah data berdasarkan ID
    // const updatePromise = db.collection('mahasiswa').updateOne(
    //     {
    //         _id: ObjectID('64fe93ea3a5a263ea4a8052f')
    //     },
    //     {
    //         $set: {
    //             email: 'ramadhan@rocketmail.com'
    //         }
    //     }
    // );

    // updatePromise.then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    //? Mengubah data lebih dari 1 berdasarkan kriteria
    // db.collection('mahasiswa').updateMany(
    //     {
    //         nama: 'Aldy'
    //     },
    //     {
    //         $set: {
    //             nama: 'Aldy Ramadhan',
    //         },
    //     }
    // );

    //? Menghapus 1 data
    db.collection('mahasiswa').deleteOne(
        {
            _id: ObjectID('64fe93ea3a5a263ea4a8052f')
        }
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
});