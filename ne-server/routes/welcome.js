/** Welcome page */
module.exports = (req, res) => {
    res.sendFile(path.join(__dirname, 'welcome.html'));
}
