const express = require('express');
const router = express.Router();
const connection = require('../utils/database');

router.get('/', (req, res) => {
    res.render('form');
});

router.post('/status', (req, res) => {
    const { name, gender, phone, birthdate, address, email, complain, meetingDate, nama_dokter } = req.body;

    // Validasi: Memastikan tidak ada field yang kosong
    if (!name || !gender || !phone || !birthdate || !address || !email || !complain || !meetingDate || !nama_dokter) {
        console.error("Ada field yang belum diisi.");
        return res.render('rejected', { message: 'Mohon isi semua field.' });
    }

    // Validasi: Memastikan meeting date tidak dipilih pada masa lampau
    const now = new Date();
    const selectedMeetingDate = new Date(meetingDate);
    if (selectedMeetingDate < now) {
        console.error("Meeting date dipilih pada masa lampau.");
        return res.render('rejected', { message: 'Mohon pilih meeting date yang valid.' });
    }

    // Validasi: Memastikan birthdate dipilih pada masa lampau
    const selectedBirthdate = new Date(birthdate);
    if (selectedBirthdate >= now) {
        console.error("Tanggal lahir harus sebelum hari ini.");
        return res.render('rejected', { message: 'Mohon masukkan tanggal lahir yang valid.' });
    }

    // Validasi: Memastikan nama tidak mengandung angka
    if (/\d/.test(name)) {
        console.error("Nama tidak boleh mengandung angka.");
        return res.render('rejected', { message: 'Nama tidak boleh mengandung angka.' });
    }

    // Jika semua validasi berhasil, lakukan penyimpanan data ke database
    const query = 'INSERT INTO form (name, gender, phone, birthdate, address, email, complain, meetingDate, nama_dokter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [name, gender, phone, birthdate, address, email, complain, meetingDate, nama_dokter], (err, result) => {
        if (err) {
            console.error(`Error Mengisi Data: ${err}`);
            return res.render('rejected', { message: 'Terjadi kesalahan. Mohon coba lagi.' });
        }
        console.log('Data berhasil di input');
        return res.render('success');
    });
});

module.exports = router;
