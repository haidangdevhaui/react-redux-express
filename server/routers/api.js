export default function(api){
    api.get('/user', (req, res) => {
        res.send('working!');
    })
}