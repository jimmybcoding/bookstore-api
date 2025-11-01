import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
        return res.status(401).json({ message: 'No token provided.' });
        }
        
        const token = authHeader.split(' ')[1]; // Standard way to remove Bearer prefix from the actual token
        if (!token) {
        return res.status(401).json({ message: 'Malformed token.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded payload to request object
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired.' });
        }
    return res.status(401).json({ message: 'Invalid token.' });
  }
} 
