import { MongoClient } from 'mongodb';

function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address' });
            return;
        }

        MongoClient.connect(
            'mongodb+srv://wskim:dRO3O6P2vV68P4MH@cluster0.c4wznsy.mongodb.net/?retryWrites=true&w=majority'
        ).then((client) => {
            const db = client.db();
            db.collection('emails');
            console.log(`connect ${client}`);
        });

        console.log(userEmail);

        res.status(201).json({ message: 'Signed up!' });
    }
}

export default handler;
