const URL = require("../model/url")
const shortid = require("shortid")

async function generateNewShorUrl(req, res) {
    const body = req.body
    if (!body.url) {
        return res.status(400).json({ error: "url is required" })
    }

    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    })

    return res.status(201).json({ id: shortId })
}

async function setHistory(req, res) {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })

    res.redirect(entry.redirectUrl)
}


async function getTotalClicks(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    res.json({
        totalclicks: result.visitHistory.length,
        urlAnalytics: result.visitHistory
    })

}
module.exports = {
    generateNewShorUrl,
    setHistory,
    getTotalClicks
}