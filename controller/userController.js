import Users from '../model/user';


exports.user = async (req, res, next) => {
    Users.create(req.body)
        .then((User) => {
            Users.aggregate([{
                $match: {
                    name: User.name,
                    test: User.test
                }
            }, {
                $lookup: {
                    from: 'testquestions',
                    localField: 'test',
                    foreignField: 'test',
                    as: 'Questions'
                }
            }, {
                $addFields: {
                    Questions: '$Questions.Question'
                }
            }, {
               $project: {
                    _id: 0
               } 
            }]).then((Usertest) => {
                res.json(Usertest);
            })
        })
        
        .catch((err) => {
            if (err.message !== 'Cannot read property "1" of null') {
                for (let message in err.errors) {
                    res.json({ error: err.errors[message].message })
                    // next(err.errors[message].message);
                }
            }
            res.json({ error: 'User already took test'});
        })
}