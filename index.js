const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
// Middleware untuk file statis
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint untuk konfigurasi API Database & WhatsApp
app.get('/api-config.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`
        // --- KONFIGURASI DATABASE FIREBASE ---
        window.FIREBASE_CONFIG = {
            apiKey: "AIzaSyDMrg2agHatw9REIXs0Pj-894UMhMB08NI",
            authDomain: "databaseku-4e72e.firebaseapp.com",
            databaseURL: "https://databaseku-4e72e-default-rtdb.firebaseio.com",
            projectId: "databaseku-4e72e",
            storageBucket: "databaseku-4e72e.firebasestorage.app",
            messagingSenderId: "586627388924",
            appId: "1:586627388924:web:8b39ecd9f5e5d34ee78e79",
            measurementId: "G-JSP6R4FN49"
        };

        // --- KONFIGURASI WHATSAPP ---
        window.NOMOR_WHATSAPP = "6289525036410";
    `);
});

// Route khusus untuk halaman produk
app.get('/dashboard/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/gzi/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/gzi/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Redirect untuk URL yang salah
app.get('/contact.html', (req, res) => {
    res.redirect('/gzi/contact');
});

app.get('/about.html', (req, res) => {
    res.redirect('/gzi/about');
});

// Handler untuk halaman utama (root)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 Handler - HARUS di paling akhir
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Error handler untuk server errors (500)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});

// Ekspor app untuk Vercel (Ini penting banget buat Serverless Function di Vercel)
module.exports = app;
