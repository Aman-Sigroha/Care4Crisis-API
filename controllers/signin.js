const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect form submission')
    }
    db.select('email', 'hash').from('login2').where('email', email).then(data =>{
        if(bcrypt.compareSync(password, data[0].hash)){
            return db.select('*').from('users2').where('email', email).then(user => {
                res.json(user[0])
            }).catch(err => res.status(400).json('error getting user'))
        }else{
            res.status(400).json('wrong credentials')
        }
    }).catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
};