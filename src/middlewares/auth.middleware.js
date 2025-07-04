import jwt from 'jsonwebtoken';

const authProtector = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Token Missing' })
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log('Error in Auth Middleware', error)
        res.status(401).json({ message: 'Token Invalid' })
    }                                                                                          vb                                                           
}

export default authProtector;