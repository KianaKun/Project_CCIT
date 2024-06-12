const requireLogin = (req, res, next) => {
    const isLoggedIn = false;

    if (isLoggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
};
module.exports=requireLogin;