const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
{
  originalUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    default: null,   // null means no expiry
    index: { expires: 0 } //Will automatically delete the data 60 secs after expiry by using this TTL index.
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Url", urlSchema);