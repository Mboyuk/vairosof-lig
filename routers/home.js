const express = require('express');
const { home, addTeam ,homePost, info} = require('../controllers/home');

const router = express.Router();

router.get('/', home);
router.post("/",homePost);
router.get("/info",info)
router.get("/addTeam",addTeam);

module.exports = router;
