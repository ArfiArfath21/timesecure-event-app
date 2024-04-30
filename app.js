const express = require('express');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/generate-qr', async (req, res) => {
    const expiresIn = 120; // token expires in 5 minutes (300 seconds)
    const token = jwt.sign({ access: true }, SECRET_KEY, { expiresIn: expiresIn });
    const url = `http://${req.headers.host}/subpage?token=${token}`;
    QRCode.toDataURL(url)
        .then(qrCodeImage => {
            res.json({ qrCodeImage, url });
        })
        .catch(error => {
            console.error('Error generating QR code:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get('/subpage', (req, res) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);
        console.log(decoded.exp);
        res.render('subpage', { message: 'Access Granted to Sub Page', expires: decoded.exp });
    } catch (error) {
        res.status(403).render('subpage', { message: 'Access Denied', expires: null });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
