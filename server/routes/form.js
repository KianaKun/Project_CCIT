const express = require('express');
const router = express.Router();
const connection = require('../utils/database');
const validasiData = require('../utils/condition');  // Mengimpor fungsi validasi

router.get('/', (req, res) => {
    res.render('form');
});

router.post('/status', (req, res) => {
    const formData = req.body;

    // Menggunakan fungsi validasi
    const validation = validasiData(formData);

    // Memeriksa hasil validasi
    if (!validation.valid) {
        console.error(validation.message);
        return res.render('rejected', { message: validation.message });
    }

    // Jika semua validasi berhasil, lakukan penyimpanan data ke database
    const query = 'INSERT INTO form (name, gender, phone, birthdate, address, email, complain, meetingDate, nama_dokter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [formData.name, formData.gender, formData.phone, formData.birthdate, formData.address, formData.email, formData.complain, formData.meetingDate, formData.nama_dokter], (err, result) => {
        if (err) {
            console.error(`Error Mengisi Data: ${err}`);
            return res.render('rejected', { message: 'Terjadi kesalahan. Mohon coba lagi.' });
        }
        console.log('Data berhasil di input');
        return res.render('success');
    });
});

module.exports = router;
