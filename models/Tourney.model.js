const { Schema, model, default: mongoose } = require("mongoose");

const tourneySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
      trim: true,
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "gamre is required"],
      ref: "Game",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    active: {
      type: Boolean,
      default: false,
    },
    quarterA: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    scoreQA1: String,
    scoreQA2: String,
    quarterB: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    scoreQB1: String,
    scoreQB2: String,
    quarterC: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    scoreQC1: String,
    scoreQC2: String,
    quarterD: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    scoreQD1: String,
    scoreQD2: String,
    semiA: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    scoreSA1: String,
    scoreSA2: String,
    semiB: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    scoreSB1: String,
    scoreSB2: String,
    final: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    scoreF1: String,
    scoreF2: String,
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  {
    timestamps: true,
  }
);

const Tourney = model("Tourney", tourneySchema);

module.exports = Tourney;
