const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Database connection
const db = require('./src/config/db');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Routes
const projectRoutes = require('./src/routes/projectRoutes');
const enquiryRoutes = require('./src/routes/enquiryRoutes');

app.use('/projects', projectRoutes);
app.use('/enquiries', enquiryRoutes);

// Main routes
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/services', (req, res) => res.render('services'));
app.get('/projects', (req, res) => res.render('projects'));
app.get('/enquiry', (req, res) => res.render('enquiry'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
