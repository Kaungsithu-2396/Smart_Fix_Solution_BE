const mongoose = require("mongoose");
const feedbackSchema = mongoose.Schema({
    description: {
        type: String,
    },
    satisfiedRate: {
        type: Number,
        enum: [10, 50, 100],
        default: 10,
    },
    feedbackBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
});
const feedbackModel = mongoose.model("feedback", feedbackSchema);
module.exports = feedbackModel;
