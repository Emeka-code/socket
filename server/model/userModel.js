const mongoose = require("mongoose");
const userModel = mongoose.Schema(
  {
    name: {
      type: String,
    },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "likes" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userModel);
