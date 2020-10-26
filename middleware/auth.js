import jwt from'jsonwebtoken'
import { accessTokenSecret, refreshTokenSecret, refreshTokens } from '../config/jwt.js';

export const authenticateJWT =(req, res, next) => {
    const authHeader = req.headers.authorization
    
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if(err){
                return res.status(403);
            }
            req.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }
}