const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

// Import routes
const taskRoutes = require('./routes/task');
const employeeRoutes = require('./routes/employee');
const departmentRoutes = require('./routes/department');
const requestRoutes = require('./routes/request');
const approvalRoutes = require('./routes/approval');
const attendanceRoutes = require('./routes/attendance');

// API Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/attendance', attendanceRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ 
                 status: 'OK',
          timestamp: new Date(),
          message: 'FocoWork Mini App is running'
    });
});

// Webhook for Zalo
app.post('/webhook', (req, res) => {
    try {
          const { event, data } = req.body;
          console.log('📨 Webhook received:', { event, data });

      switch(event) {
        case 'message.received':
                  handleMessage(data);
                  break;
        case 'user.follow':
                  handleUserFollow(data);
                  break;
        case 'oa_interaction':
                  handleOAInteraction(data);
                  break;
      }

      res.json({ success: true, message: 'Webhook processed' });
    } catch (error) {
          console.error('❌ Webhook error:', error);
          res.status(500).json({ success: false, error: error.message });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ 
                             success: false, 
          message: 'Route not found',
          path: req.originalUrl
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    res.status(500).json({ 
                             success: false,
          message: 'Internal server error',
          error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
      ╔════════════════════════════════════╗
        ║  🚀 FocoWork Mini App              ║
          ║  Server running on port ${PORT}       ║
            ║  Environment: ${process.env.NODE_ENV || 'development'}     ║
              ╚════════════════════════════════════╝
                `);
});

// Helper functions
function handleMessage(data) {
    console.log('📨 New message:', data);
}

function handleUserFollow(data) {
    console.log('👤 New follower:', data);
}

function handleOAInteraction(data) {
    console.log('🔔 OA Interaction:', data);
}

module.exports = app;
