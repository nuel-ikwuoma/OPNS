const { BadRequestError } = require("../errors");
const ethers = require("ethers");

const addNumber = async (req, res) => {
    res.send("Add Number");
};

const getNumber = async (req, res) => {
    const { hash } = req.query;
    if (!hash) {
        throw new BadRequestError("No hash provided");
    }

    const number = await Address.findOne({ phoneNumberHash: hash });

    if (!number) {
        throw new BadRequestError("No number found");
    }
};

module.exports = {
    addNumber,
    getNumber,
};
