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
    required: [true, 'picture is required.'],
    default: "https://play-lh.googleusercontent.com/T02lXvThp7D49ezfxtfqSF_NjQHlxv4NCqsZUjGC9JEoUARowlIwLwD5GRpCip_HEnLT"
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