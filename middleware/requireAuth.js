const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

//verify authentication
const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers
    if (!authorization)
        {
            return res.status(401).json({error:'Authorization token required'})
        }

        const token = authorization.split(' ')[1]

        try {
            const {_id} = jwt.verify(token,process.env.SECRET_TOKEN)
            require.user = await UserModel.findOne({_id}).select('_id')
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({error:'Request is not authorized'})
        }
}


module.exports = requireAuth