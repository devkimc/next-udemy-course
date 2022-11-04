import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address' });
            return;
        }

        const client = await MongoClient.connect(
            'mongodb+srv://wskim:0htkqn74wEBbyLT8@cluster0.c4wznsy.mongodb.net/?retryWrites=true&w=majority'
        );
        const db = client.db('newsletter');

        await db.collection('emails').insertOne({ email: userEmail });

        client.close();

        return res.status(201).json({ message: 'Signed up!' });
    }
}

export default handler;
