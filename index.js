import express from 'express'
import mongoose from 'mongoose';
import User from './models/user.model.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.post('/api/register', async (req, res) => {
    try{
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/users', async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/user/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/user/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body);

        if(!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser); 
    } catch(err) { 
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/user/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(`User ${deletedUser.name} has been deleted`); 
    } catch(err) { 
        res.status(500).json({ message: err.message });
    }
});

mongoose.connect('mongodb+srv://kino:MHExXeNvqWBEb3PF@kinobackend.hhhzy.mongodb.net/Node-API?retryWrites=true&w=majority&appName=KinoBackend')
.then(() => { console.log('Connected to MongoDB') })
.catch((err) => { console.log('Failed to connect to MongoDB', err) });


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
}); 