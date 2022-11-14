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
      required: [true, 'Password is required.'],
      default: "https://espndeportes.espn.com/i/teamlogos/soccer/500/default-team-logo-500.png?h=100&w=100"
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