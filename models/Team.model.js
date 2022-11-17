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
      default: "https://www.precisionpass.co.uk/wp-content/uploads/2018/03/default-team-logo.png"
     
    },
    creator:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }],
      joinPassword: {
        type: String,
        required: [true, 'joinPassword is required.']
      }
  },
  {   
    timestamps: true
  }
);

const Team = model("Team", teamSchema);

module.exports = Team;