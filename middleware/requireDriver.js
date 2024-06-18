
const jwt = require('jsonwebtoken');
const Driver = require('../models/DriverModel');

//verify authentication driver
const requireDriver = async (req, res, next) => {
    
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const driver = await Driver.findById(decoded._id);

        if (!driver) {
            return res.status(401).json({ error: 'Driver not found' });
        }

        req.driver = driver;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireDriver