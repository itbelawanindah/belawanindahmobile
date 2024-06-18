const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const Driver = require('../models/DriverModel');

//verify authentication user
module.exports.requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports.adminOnly = async  (req, res,next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const user = await UserModel.findById(decoded._id);
        
        if(user.roles !== "admins-Author") return res.status(403).json({msg:"Akses terlarang"});
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = user;
        req.userId = user.id;
        req.roles = user.roles;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
}


module.exports.userOnly = async  (req, res,next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const user = await UserModel.findById(decoded._id);
        
        if(user.roles !== "customer-Author") return res.status(403).json({msg:"Akses terlarang"});
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = user;
        req.userId = user._id;
        req.roles = user.roles;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
}


module.exports.driverOnly = async  (req, res,next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const driver = await Driver.findById(decoded._id);
        
        if(driver.roles !== "drivers-Author") return res.status(403).json({msg:"Akses terlarang"});
        if (!driver) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.driver = driver;
        req.roles = driver.roles;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
}


// module.exports =  {
//     requireAuth,
//     adminOnly,
// }