function handle404Middleware(req, res) {
    const { accepts } = req.headers;
    // if (accepts && accepts.toLowerCase() === "application/json") {
        return res.status(404).json({ message: "You might be lost!" });
    // } else {
        // return res.status(404).send("You might be lost");
    // }

}

module.exports = handle404Middleware;