require('dotenv').config();

function authenticateAdmin(req, res, next) {
    const { username, password } = req.body
    if (username === process.env.USER_NAME && password === process.env.PASS_WORD) {
        app.set('user', true);
        return next()
    }
    res.redirect('/login')
}

module.exports = authenticateAdmin