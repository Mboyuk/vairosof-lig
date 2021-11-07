const chanceCal = (teamss, week, teams) => {
  console.log(teamss);
  var chanceChamp = [];
  var sayac = 0;
  var a = [];
  for (let i = 1; i < 4; i++) {
    if (teams[0].points - teams[i].points > (6 - week) * 3) {
      sayac++;
      var obj = {
        name: teams[i].name,
        chance: "%0",
      };
      chanceChamp.push(obj);
      if (sayac == 3) {
        var obj2 = {
          name: teams[0].name,
          chance: "%100",
        };
        chanceChamp.push(obj2);
        return chanceChamp;
      }
    } else {
      a.push(teams[i]);
    }
  }
  a.push(teams[0]);
  var ddd = [];

  a.forEach((el, i) => {
    var obj = {
      name: el.name,
      chance:
        (a[i].ofPower / 8 / 2) *
        100 *
        Math.pow(1.02, a[i].winStreak - a[i].loseStreak),
    };
  });
  var c =
    (a[0].ofPower / 8 / 2) *
    100 *
    Math.pow(1.02, a[0].winStreak - a[0].loseStreak);
  console.log(c + "afsdasdfasdfasdfsadf");
  var k =
    (a[1].ofPower / 4 / 2) *
    100 *
    Math.pow(1.02, a[1].winStreak - a[1].loseStreak);

  console.log(k);
  return chanceChamp;
};
module.exports = {
  chanceCal,
};
