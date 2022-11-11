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
      default: true,
    },
    quarterA: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    quarterB: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    quarterC: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    quarterD: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    semiA: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    semiB: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    final: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
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
