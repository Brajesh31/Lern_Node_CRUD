const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // Check if authorization header exists
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Extract the jwt token from the request headers
    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid token' });
    }
}

// Generate JWT token
const generateToken = (userData) => {
    return jwt.sign(
        userData,
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

module.exports = { jwtAuthMiddleware, generateToken };