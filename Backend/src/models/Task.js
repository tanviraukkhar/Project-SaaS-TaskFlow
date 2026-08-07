const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema(

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
        "Todo",
        "In Progress",
        "Completed"
      ],

      default: "Todo",

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



    dueDate: {

      type: Date,

    },





    // ===============================
    // Project Reference
    // ===============================

    project: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Project",

      required: true,

    },





    // ===============================
    // Multiple Assigned Users
    // ===============================

    assignedTo: [

      {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

      }

    ],





    // ===============================
    // Task Creator
    // ===============================

    createdBy: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },





    // ===============================
    // Task Activity History
    // ===============================

    activities: [

      {

        user: {

          type: mongoose.Schema.Types.ObjectId,

          ref: "User",

          required: true,

        },


        action: {

          type: String,

          required: true,

        },


        date: {

          type: Date,

          default: Date.now,

        }


      }

    ]



  },

  {

    timestamps: true,

  }

);



module.exports = mongoose.model(
  "Task",
  taskSchema
);