import mongoose from 'mongoose';

// Fast identisch zum Template, aber mit einem Status (abgehakt oder nicht)
const logItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  timeOfDay: { type: String, required: true },
  // Auch hier speichern wir die Hinweise, falls der Nutzer das 
  // Supplement in der Zukunft im Template ändert, bleibt der alte Log korrekt.
  requiresFood: { type: Boolean, default: false },
  requiresWater: { type: Boolean, default: false },
  completed: { type: Boolean, default: false } // Der Haken für den Tracker!
});

const dailyLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  date: { 
    type: String, 
    required: true // Format: YYYY-MM-DD (vereinfacht die Abfrage extrem)
  },
  supplements: [logItemSchema],
  // Um nicht jedes Mal alle Items prüfen zu müssen, speichern wir den Fortschritt
  isFullyCompleted: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

// Ein User darf pro Tag nur EINEN Log haben
dailyLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model('DailyLog', dailyLogSchema);