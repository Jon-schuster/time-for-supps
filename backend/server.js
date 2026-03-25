import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Lädt die Umgebungsvariablen aus der .env Datei
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
// Erlaubt Cross-Origin Requests
app.use(cors());
// Erlaubt es dem Server, JSON-Daten im Request-Body zu lesen
app.use(express.json());

// --- ROUTEN ---
// Eine einfache Test-Route, um im Browser zu prüfen, ob der Server antwortet
app.get('/', (req, res) => {
  res.send('Time For Supps API is running');
});

// --- DATENBANK & SERVER START ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    
    // Server listened auf dem angegebenen Port
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB-connection-error:', error.message);
  });