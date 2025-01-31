import express from 'express'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.post('/api/login', (req, res) => {
    if(!req.body.name || !req.body.password) {
        res.status(400).send('Name and password are required');
    } else{
    const name = req.body.name;
    console.log("New user is logging in: " + name);
    res.send('You are logged in');
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
}); 