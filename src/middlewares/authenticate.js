const jwt = require('jsonwebtoken');

// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Look for token in cookies or headers
    console.log(token ? 'Token is provided' : "Token is not provided")
    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied." });
    }

    try {
        // Verify the token using your JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET is your secret key used to sign the token
        req.user = decoded; // Attach the user data (from the token) to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid." });
    }
};

module.exports = authenticateUser;
