const League = require("../../models/League");
// const { baseModelName } = require("../../models/Team");
const Team = require("../../models/Team");

const createMatchTable = async (teams, week) => {
  var league = await League.findOne({ week: week });
  
  if (league == null) {
    console.log("afdadsfasfdadf");
  }
  // console.log(scoreMatches);
  if (league.matches.length > 0) {
  } else {
    var matches = await createMatches(teams, week);
    var scoreMatches = await createScore(matches, teams);
    league.matches.push(scoreMatches[0]);
    league.matches.push(scoreMatches[1]);
  }

  await league.save();
  return league;
};

const createMatches = (teams, week) => {
  const dizi = [];
  if (week == 1) {
    const kayit = {
      teamName: teams[3].name,
      opTeam: teams[0].name,
    };
    const kayit2 = {
      teamName: teams[2].name,
      opTeam: teams[1].name,
    };
    dizi.push(kayit);
    dizi.push(kayit2);
  } else if (week == 2) {
    const kayit = {
      teamName: teams[1].name,
      opTeam: teams[3].name,
    };
    const kayit2 = {
      teamName: teams[0].name,
      opTeam: teams[2].name,
    };
    dizi.push(kayit);
    dizi.push(kayit2);
  } else if (week == 3) {
    const kayit = {
      teamName: teams[3].name,
      opTeam: teams[2].name,
    };
    const kayit2 = {
      teamName: teams[1].name,
      opTeam: teams[0].name,
    };
    dizi.push(kayit);
    dizi.push(kayit2);
  } else if (week == 4) {
    const kayit = {
      teamName: teams[0].name,
      opTeam: teams[3].name,
    };
    const kayit2 = {
      teamName: teams[1].name,
      opTeam: teams[2].name,
    };
    dizi.push(kayit);
    dizi.push(kayit2);
  } else if (week == 5) {
    const kayit = {
      teamName: teams[3].name,
      opTeam: teams[1].name,
    };
    const kayit2 = {
      teamName: teams[2].name,
      opTeam: teams[0].name,
    };
    dizi.push(kayit);
    dizi.push(kayit2);
  } else if (week == 6) {
    const kayit = {
      teamName: teams[2].name,
      opTeam: teams[3].name,
    };
    const kayit2 = {
      teamName: teams[0].name,
      opTeam: teams[1].name,
    };
    dizi.push(kayit);
    dizi.push(kayit2);
  } else if (week == 7) {
  }
  return dizi;
};

const createScore = async  (matches, teams) => {

    var a = teams.find(el => el.name == "galatasaray")
  matches.forEach((element) => {
    var team = teams.find((el) => el.name == element.teamName)
    var opTeam = teams.find((el) => el.name == element.opTeam)
   
    element.fScore = Math.round((team.power*(team.ofPower/opTeam.defPower)) + Math.pow(1.02,(team.winStreak-team.loseStreak))) + Math.floor(Math.random() * 2)-2,
    element.sScore = Math.round((opTeam.power*(opTeam.ofPower/team.defPower) ) + Math.pow(1.02,(opTeam.winStreak-opTeam.loseStreak))) + Math.floor(Math.random() * 2)-2; 
  });
  var allTeam = await Team.find()

    matches.forEach(async(el) => {
       
      if (el.fScore > el.sScore) {
        var a = allTeam.find(e => e.name==el.teamName)
        a.played+=1;
        a.won+=1;
        a.gf += el.fScore
        a.ga += el.sScore
        a.winStreak+=1
        a.loseStreak=0;
        await a.save()
        var b = allTeam.find(e => e.name == el.opTeam)
        b.played+=1;
        b.lost+=1
        b.gf +=el.sScore
        b.ga += el.fScore
        b.loseStreak+=1;
        b.winStreak =0;
        await b.save()

      } else if (el.fScore < el.sScore) {
        var a = allTeam.find(e => e.name==el.opTeam)
        a.played+=1;
        a.won+=1;
        a.gf += el.sScore
        a.ga += el.fScore
        a.winStreak+=1;
        a.loseStreak=0;
        await a.save()
        var b = allTeam.find(e => e.name == el.teamName)
        b.played+=1;
        b.lost+=1
        b.gf +=el.fScore
        b.ga += el.sScore
        b.winStreak = 0;
        b.loseStreak+=1;
        await b.save()
      } else {
        var a = allTeam.find(e => e.name==el.teamName)
        a.played+=1;
        a.drawn+=1;
        a.gf += el.sScore
        a.ga += el.fScore
        await a.save()
        var b = allTeam.find(e => e.name == el.opTeam)
        b.played+=1;
        b.drawn+=1
        b.gf +=el.sScore
        b.ga += el.fScore
        await b.save()
      }
    });
   
  return matches;
};

module.exports = {
  createMatchTable,
};
