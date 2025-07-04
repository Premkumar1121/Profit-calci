import mongoose from 'mongoose';

const costSchema = new mongoose.Schema({
  _id: String,
  fuelPricePerKm: Number,
  driverRatePerKm: Number,
  tollCost: Number
}, { collection: 'costs' });

export default mongoose.model('Cost', costSchema);
