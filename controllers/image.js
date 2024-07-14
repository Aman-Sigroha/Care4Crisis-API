
const image = (req, res, db)=>{
    const { id } = req.body;
    db('users2').where('id', id).increment('entries',1).returning('entries').then(entries =>{
        res.json(entries[0].entries)
    }).catch(err => res.status(400).json('error getting entries'))
}
module.exports = {
    image : image
}