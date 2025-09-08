// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userDataRoutes = require('./routes/userDataRoutes'); // user profile
 // Import passport configuration
const passport = require('passport');
const faqRoutes = require('./routes/faq');
const projectRoutes = require('./routes/project');
const serviceRoutes = require('./routes/service');
const teamRoutes = require('./routes/team');
const testimonialRoutes = require('./routes/testimonial');
const jobRoutes = require('./routes/jobRoutes');


dotenv.config();

require('./config/passport'); // Initialize passport configuration
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(passport.initialize());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userDataRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/jobs', require('./routes/jobRoutes')); // Job routes

// Connect DB and start server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
