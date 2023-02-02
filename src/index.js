const express = require('express');
const bp = require('body-parser');
const dotenv = require('dotenv');
const ApiRoutes = require('./api/api');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = 5000;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/api', cors(), ApiRoutes);

app.listen(PORT, () => console.log(`Server has started at http://localhost:${PORT}`));
