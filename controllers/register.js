const handleRegister = (req, res, db, bcrypt, saltRounds) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        console.log('Incorrect form submission');
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login2')
        .returning('email')
        .then(loginEmail => {
            return trx('users2')
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        console.error('Error during registration:', err);
        res.status(400).json('unable to register');
    });
};

module.exports = {
    handleRegister: handleRegister
};
