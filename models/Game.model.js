const { Schema, model, default: mongoose } = require("mongoose");


const gameSchema = new Schema(
  {
    name:{
      type: String,
      required:[true, "name is required"],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    picture: {
      type: String,
      required: [true, 'Password is required.']
    },
    creator:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {   
    timestamps: true
  }
);

const Game = model("Game", gameSchema);

module.exports = Game;