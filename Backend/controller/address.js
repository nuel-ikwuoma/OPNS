const addNumber = async (req, res) => {
    res.send("Add Number");
};

const getNumber = async (req, res) => {
    res.send("Get Numbers");
};

module.exports = {
    addNumber,
    getNumber,
};