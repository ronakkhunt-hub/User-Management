module.exports = (req, res, next) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.json({
            message: 'content-type plain/text is not allowed'
        })
    }else{
        next()
    }
}