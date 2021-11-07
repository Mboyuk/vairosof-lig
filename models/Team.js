const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const TeamSchema = new Schema({
    
    name: {
        type: String
    },
    power: {
        type:Number,
        default:0
    },
    played: {
        type:Number,
        default: 0
    },
    won: {
        type: Number,
        default: 0
    },
    drawn: {
        type: Number,
        default: 0
    },
    lost: {
        type: Number,
        default: 0
    },
    gf: {
        type: Number,
        default: 0
    },
    ga: {
        type: Number,
        default: 0
    },
    gd: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    winStreak: {
        type:Number,
        default:0
    },
    loseStreak: {
        type: Number,
        default:0
    },
    ofPower: {
        type:Number,
        default:0
    },
    defPower: {
        type:Number,
        default:0
    }


});

TeamSchema.pre("save",function(next){
    if(this.isModified("played")){
        next();
    }
   this.gd = this.gf - this.ga
    this.points = this.won*3+this.drawn*1
    next();

})


module.exports = mongoose.model("Team",TeamSchema)