import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  identificacion: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nombres: {
    type: String,
    required: true,
    trim: true
  },
  apellidos: {
    type: String,
    required: true,
    trim: true
  },
  tipoIdentificacion: {
    type: String,
    required: true,
    enum: ['CC', 'TI', 'CE', 'RC']
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  numeroCelular: {
    type: String,
    required: true,
    trim: true
  },
  correoElectronico: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;