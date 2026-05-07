const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 10
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  versionKey: false
});

module.exports = mongoose.model("Note", noteSchema);