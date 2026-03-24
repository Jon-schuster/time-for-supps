import mongoose from 'mongoose';

// Definition für ein einzelnes Supplement in der Vorlage
const supplementSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  dosage: { 
    type: String, 
    required: true 
  },
  timeOfDay: { 
    type: String, 
    enum: ['Morgens', 'Pre-Workout', 'Abends', 'Sonstiges'], 
    default: 'Morgens' 
  },
  // Einnahmehinweise für Tooltips im Frontend
  requiresFood: {
    type: Boolean,
    default: false // Standardmäßig nicht zwingend erforderlich
  },
  requiresWater: {
    type: Boolean,
    default: false // Standardmäßig nicht zwingend erforderlich
  }
});

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  // Streak-Zähler
  streakCount: { 
    type: Number, 
    default: 0 
  },
  // Wichtig für den Streak: Wann wurde zuletzt 100% erreicht?
  lastCompletedDate: { 
    type: String, // Format: YYYY-MM-DD
    default: null 
  },
  // Die Vorlage des Nutzers, die jeden Tag neu kopiert wird
  template: [supplementSchema] 
}, { timestamps: true });

export default mongoose.model('User', userSchema);