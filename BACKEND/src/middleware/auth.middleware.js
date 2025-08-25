import jwt from 'jsonwebtoken'


export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message: 'Unauthorized'});
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is invalid" });
    }
}