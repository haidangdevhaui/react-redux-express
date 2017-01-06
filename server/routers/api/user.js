import User from '../../models/user';

export default (api) => {

    api.get('/user', (req, res) => {
        User.find().exec((e, d) => {
            res.json(d);
        })
    });

    api.post('/user', (req, res) => {
        console.log(req.body);
        res.json(req.body);
    });
}