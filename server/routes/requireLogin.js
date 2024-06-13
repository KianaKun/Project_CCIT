const connection = require('../utils/database');

function requireLogin(req, res, next) {
    const { id } = req.body; // Asumsikan ID pengguna dikirim melalui req.body
    const query = 'SELECT statusLogin FROM admins WHERE statusLogin=1';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error(`Error executing query: ${err}`);
            return res.render('login', { error: 'Database error' });
        }
        if (results.length > 0 && results[0].statusLogin === 1) {
            next();
        } else {
            res.redirect('/login');
        }
    });
}

module.exports = requireLogin;
