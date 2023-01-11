const express = require('express');
const bp = require('body-parser');
const dotenv = require('dotenv');
const AuthRoutes = require('./services/auth-routes');

dotenv.config();

const app = express();
const PORT = 8080;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/api/users', AuthRoutes);

app.listen(PORT, () => console.log(`Server has started at http://localhost:${PORT}`));
