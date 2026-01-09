import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  organizer: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  registered: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  tags: [String],
  image: { type: String, required: true },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
