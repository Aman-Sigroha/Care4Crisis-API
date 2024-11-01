
const id = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users2').where('id', id ).then(user => {
        if(user.length){
            res.json(user[0])
        } else {
            res.status(400).json('Not Found')
        }
    }).catch(err => res.status(400).json('error getting user'))
};

module.exports = {
    id : id
};