const express = require('express');
const router = express.Router();
const connection = require('../utils/database');
const excel = require('exceljs');
const validasiData = require('../utils/condition');

// Route untuk menampilkan halaman dashboard dengan filter dan pencarian
router.get('/', (req, res) => {
    let query = 'SELECT * FROM form';
    const params = [];
    const { meetingDate, name } = req.query;
    res.setHeader('Cache-Control', 'no-store');

    if (meetingDate || name) {
        query += ' WHERE';
        if (meetingDate) {
            query += ' DATE(meetingDate) = ?';
            params.push(meetingDate);
        }
        if (meetingDate && name) {
            query += ' AND';
        }
        if (name) {
            query += ' name LIKE ?';
            params.push(`%${name}%`);
        }
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error(`Error executing query: ${err}`);
            return res.render('dashboard', { error: 'Database error', data: [], meetingDate, name });
        }
        res.render('dashboard', { data: results, meetingDate, name });
    });
});

// menghapus data berdasarkan ID
router.post('/delete/:idform', (req, res) => {
    const { idform } = req.params;
    const query = 'DELETE FROM form WHERE idform = ?';
    connection.query(query, [idform], (err, result) => {
        if (err) {
            console.error(`Error executing query: ${err}`);
            return res.redirect('/dashboard?error=Database error');
        }
        if (result.affectedRows === 0) {
            return res.redirect('/dashboard?error=No record found');
        }
        res.redirect('/dashboard');
    });
});

//  menampilkan halaman update data berdasarkan ID
router.get('/update/:idform', (req, res) => {
    const { idform } = req.params;
    const query = 'SELECT * FROM form WHERE idform = ?';
    connection.query(query, [idform], (err, results) => {
        if (err) {
            console.error(`Error executing query: ${err}`);
            return res.redirect('/dashboard?error=Database error');
        }
        if (results.length === 0) {
            return res.redirect('/dashboard?error=No record found');
        }
        res.render('update', { form: results[0], error: null });
    });
});

// memproses update data berdasarkan ID
router.post('/update/:idform', (req, res) => {
    const { idform } = req.params;
    const formData = req.body;
    const validation = validasiData(formData);

    if (!validation.valid) {
        console.error(validation.message);
        return res.redirect(`/dashboard/update/${idform}?error=${validation.message}`);
    }

    const query = `
        UPDATE form 
        SET name = ?, gender = ?, phone = ?, birthdate = ?, address = ?, email = ?, complain = ?, meetingDate = ?, nama_dokter = ? 
        WHERE idform = ?
    `;
    const values = [formData.name, formData.gender, formData.phone, formData.birthdate, formData.address, formData.email, formData.complain, formData.meetingDate, formData.nama_dokter, idform];
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error(`Error executing query: ${err}`);
            return res.redirect(`/dashboard/update/${idform}?error=Database error`);
        }
        if (result.affectedRows === 0) {
            return res.redirect(`/dashboard/update/${idform}?error=No record found`);
        }
        res.redirect('/dashboard');
    });
});

// logout admin
router.post('/logout', (req, res) => {
    const query = 'UPDATE admins SET statusLogin = 0 WHERE statusLogin = 1';
    connection.query(query, (err) => {
        if (err) {
            console.error(`Error executing query: ${err}`);
            return res.render('login', { error: 'Database error' });
        }
        res.redirect('/');
    });
});

// export data ke Excel
router.get('/export', (req, res) => {
    let query = 'SELECT * FROM form';
    const params = [];
    const { meetingDate, name } = req.query;

    if (meetingDate || name) {
        query += ' WHERE';
        if (meetingDate) {
            query += ' DATE(meetingDate) = ?';
            params.push(meetingDate);
        }
        if (meetingDate && name) {
            query += ' AND';
        }
        if (name) {
            query += ' name LIKE ?';
            params.push(`%${name}%`);
        }
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error(`Error executing query: ${err}`);
            return res.redirect('/dashboard?error=Database error');
        }

        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Data Pasien Hari Ini');

        worksheet.columns = [
            { header: 'Nama', key: 'name', width: 20 },
            { header: 'Jenis Kelamin', key: 'gender', width: 15 },
            { header: 'Telepon', key: 'phone', width: 15 },
            { header: 'Tanggal Lahir', key: 'birthdate', width: 15 },
            { header: 'Alamat', key: 'address', width: 30 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Keluhan', key: 'complain', width: 30 },
            { header: 'Tanggal Pertemuan', key: 'meetingDate', width: 15 },
            { header: 'Nama Dokter', key: 'nama_dokter', width: 20 },
        ];

        worksheet.addRows(results);

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ); 
        res.setHeader(
            'Content-Disposition',
            'attachment; filename="Data Pasien Hari Ini.xlsx"'
        );

        workbook.xlsx.write(res)
            .then(() => {
                res.status(200).end();
            })
            .catch((err) => {
                console.error(`Error writing workbook: ${err}`);
                res.redirect('/dashboard?error=Error exporting data');
            });
    });
});

module.exports = router;
