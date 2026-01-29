const express = require("express")
const { generateNewShorUrl, setHistory, getTotalClicks } = require("../controller/url")

const router = express.Router()

router.post("/", generateNewShorUrl)

router.get("/:shortId", setHistory)

router.get("/analytics/:shortId", getTotalClicks)

module.exports = router