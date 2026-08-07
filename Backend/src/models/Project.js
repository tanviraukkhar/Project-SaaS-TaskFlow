const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Planning",
        "In Progress",
        "Completed"
      ],
      default: "Planning",
    },

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High"
      ],
      default: "Medium",
    },


    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },


    deadline: {
      type: Date,
    },


    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],


  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Project", projectSchema);