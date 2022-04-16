import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/login')
            }
            next();
        })
    } else res.redirect('/login');
}

export default verifyToken;
