const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique index
  age: { type: Number, required: true },
  city: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Compound index for name + age
userSchema.index({ name: 1, age: -1 });   /* filters by both name and age */

// TTL index (auto delete after 1 hour)
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });  /* documents auto-delete 1 hour after creation. */

module.exports = mongoose.model("User", userSchema);
