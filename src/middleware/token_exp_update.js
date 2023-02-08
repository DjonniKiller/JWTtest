const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    token = req.get('Authorization');
    if (!token) throw 'Authorization error!';

    const decoded = jwt.verify(token, process.env.JWT);

    

    next();
}