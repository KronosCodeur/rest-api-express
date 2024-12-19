const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const bearerHeader = req.header('Authorization');

    if (!bearerHeader) {
        return res.status(401).json({ error: 'Accès refusé, token non fourni' });
    }

    const token = bearerHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Format du token non valide' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expiré' });
        }
        return res.status(400).json({ error: 'Token invalide' });
    }
}

module.exports = authMiddleware;
