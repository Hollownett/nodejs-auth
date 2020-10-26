import jwt from'jsonwebtoken'
import { users } from '../db/users.js';
import { accessTokenSecret, refreshTokenSecret, refreshTokens } from "../config/jwt.js";

export default {
    loginUser: (req, res) => {
        const { username, password } = req.body

    const user = users.find(u => (u.username === username && u.password === password))

    if(user){
        const accessToken = jwt.sign({username: user.username, role: user.role}, accessTokenSecret, {expiresIn: "30m"})
        const refreshToken = jwt.sign({username: user.username, role: user.role}, refreshTokenSecret)
        
        refreshTokens.push(refreshToken)

        res.status(200).send({
            accessToken,
            refreshToken
        })
    }else{
        res.status(403).send("invalid username or password")
    }
  },
  refreshToken: (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
  }, 
  logoutUser: (req, res) => {
    const { token } = req.body
    refreshTokens = refreshTokens.filter(t => t !== token )
    res.send('Logout successfully')
  }
}