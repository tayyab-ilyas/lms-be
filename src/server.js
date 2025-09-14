require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3001;

connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
    console.error('Unhandled Rejection:', err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    process.exit(1);
});