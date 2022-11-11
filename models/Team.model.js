const { Schema, model, default: mongoose } = require("mongoose");


const teamSchema = new Schema(
  {
    name:{
      type: String,
    required:[true, "name is required"],
      unique: true,
      trim: true
    },
    nameTag: {
      type: String,
    required:[true, "name is required"],
      unique: true,
      trim: true
    },
    picture: {
      type: String,
    required: [true, 'Password is required.']
    },
    creator:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]
  },
  {   
    timestamps: true
  }
);

const Team = model("Team", teamSchema);

module.exports = Team;