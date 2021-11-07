const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LeagueSchema = new Schema({
  week: {
    type: String,
  },
  matches: [
    {
      teamName: {
        type: String,
      },
      opTeam: {
        type: String,
      },
      fScore: {
        type: String,
      },
      sScore: {
        type: String,
      },
      win: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("League", LeagueSchema);
