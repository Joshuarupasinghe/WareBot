import mongoose from 'mongoose';

const robotStatusSchema = new mongoose.Schema({
  stockId: { type: String, required: true },
  currentTask: { type: String, required: true },
  nextTask: { type: String, required: true },
  progress: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('RobotStatus', robotStatusSchema);
