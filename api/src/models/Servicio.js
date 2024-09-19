import mongoose from 'mongoose';

const servicioSchema = new mongoose.Schema({
  identificacion: {
    type: String,
    required: true,
    ref: 'Cliente'
  },
  servicio: {
    type: String,
    required: true,
    enum: [
      'Internet 200 MB',
      'Internet 400 MB',
      'Internet 600 MB',
      'Directv Go',
      'Paramount+',
      'Win+'
    ]
  },
  fechaInicio: {
    type: Date,
    required: true,
    default: Date.now
  },
  ultimaFacturacion: {
    type: Date,
    required: true,
    default: Date.now
  },
  ultimoPago: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

servicioSchema.index({ identificacion: 1, servicio: 1 }, { unique: true });

const Servicio = mongoose.model('Servicio', servicioSchema);

export default Servicio;