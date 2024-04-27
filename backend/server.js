const express = require('express');
const cors = require('cors');
const app = express();

const publisherRoutes = require('./routes/publisherRoutes');
const domainRoutes = require('./routes/domainRoutes');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Route configurations
app.use('/api/publishers', publisherRoutes); 
app.use('/api/domains', domainRoutes);        

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
