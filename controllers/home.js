const Team = require("../models/Team");
const League = require("../models/League");
const { createMatchTable } = require("../helpers/league/createMatch");
const { chanceCal } = require("../helpers/champCalculate/chamCalculate");
const bodyParser = require("body-parser");

const home = async (req, res) => {
  var week = req.query.week;
  var playall = req.query.playAll;
  console.log(week);
  if (!week) {
    week = 1;
  }
  if (week == 0) {
    //yeniden başlat, veritabanı sil
    var league = await League.find();
    var a = await League.updateMany(
      {},
      {
        $pull: {
          matches: {},
        },
      },
      { multi: true }
    );

    var b = await Team.updateMany(
      {},
      {
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        gd: 0,
        ga: 0,
        points: 0,
        winStreak: 0,
        loseStreak: 0,
      }
    );
    week = 1;

  }

  const teamss = await Team.find();

  var chanceChamp = [];
  if (playall == 1) {
    var league = await League.find();
    var a = await League.updateMany(
      {},
      {
        $pull: {
          matches: {},
        },
      },
      { multi: true }
    );

    var b = await Team.updateMany(
      {},
      {
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        gd: 0,
        ga: 0,
        points: 0,
        winStreak: 0,
        loseStreak: 0,
      }
    );

    for (let i = 1; i < 7; i++) {
      await createMatchTable(teamss, i);
    }
    const leagues = await League.findOne({ week: week });
    const teams = await Team.find().sort({ points: -1, gd: -1 });

    res.render("home", {
      teams,
      leagues,
      chanceChamp,
    });
  } else {
    var a = await createMatchTable(teamss, week);
    const leagues = await League.findOne({ week: week });
    const teams = await Team.find().sort({ points: -1, gd: -1 });
    const notSortTeams = await Team.find();

    if (week >= 4) {
      chanceChamp = chanceCal(notSortTeams, week, teams);
    }

    res.render("home", {
      teams,
      leagues,
      chanceChamp,
    });
  }

};

const homePost = async (req, res) => {
  const { fScore, sScore, teamName, opTeam, week } = req.body;
  const weekI = parseInt(week);
  var league = await League.findOne({ week: weekI });
  var a = league.matches.find((el) => el.teamName == teamName);
  if(!a){
    res.render("error");
  }
  var teamk = await Team.findOne({ name: teamName });
  var opTeamk = await Team.findOne({ name: opTeam });
  if (a.fScore - a.sScore < 0) {
    console.log("-----------------------------------");
    if (fScore - sScore > 0) {
      teamk.won += 1;
      teamk.lost -= 1;
      teamk.gf += parseInt(fScore)-a.fScore ;
      teamk.ga += parseInt(sScore)-a.sScore;
      opTeamk.won -= 1;
      opTeamk.lost += 1;
      opTeamk.gf += parseInt(sScore)-a.sScore;
      opTeamk.ga += parseInt(fScore)-a.fScore;
      await teamk.save();
      await opTeamk.save();
    }
  } else if (a.fScore - a.sScore > 0) {
    if (fScore - sScore < 0) {
      teamk.won -= 1;
      teamk.lost += 1;
      teamk.gf += parseInt(fScore)-a.fScore ;
      teamk.ga += parseInt(sScore)-a.sScore ;
      opTeamk.won += 1;
      opTeamk.lost -= 1;
      opTeamk.gf +=parseInt(sScore)-a.sScore ; 
      opTeamk.ga += parseInt(fScore)-a.fScore ;
      await teamk.save();
      await opTeamk.save();
    }
  } else {
    if (fScore - sScore < 0) {
      teamk.drawn -= 1;
      teamk.lost += 1;
      opTeamk.won += 1;
      opTeamk.drawn -= 1;
      await teamk.save();
      await opTeamk.save();
    } else {
      teamk.won += 1;
      teamk.drawn -= 1;
      opTeamk.drawn -= 1;
      opTeamk.lost += 1;
      await teamk.save();
      await opTeamk.save();
    }
  }

  console.log(a);
  var chanceChamp = [];
  league.matches.forEach(async (el) => {
    if (el.teamName == teamName) {
      (el.fScore = fScore), (el.sScore = sScore);
    }
  });
  await league.save();
  const leagues = await League.findOne({ week: week });
  const teams = await Team.find().sort({ points: -1, gd: -1 });
  const notSortTeams = await Team.find();
  if (week >= 4) {
    chanceChamp = chanceCal(notSortTeams, week, teams);
  }
  res.render("home", {
    leagues,
    teams,
    chanceChamp,
  });
};

const info = (req, res) => {
  res.render("information")
}

const addTeam = async (req, res, next) => {
  const teams = await Team.find();
  res.render("home", { teams });
};

module.exports = { home, addTeam, homePost, info };
