// Write functions for GET/POST methods here

const items = require("./data/items");
const companies = require("./data/companies");

const getSingleItem = (req, res) => {
    const id = req.params.id;

    const oneItem = items.find(
        (item) => item._id == id
    );
   
    if (oneItem) {
        res.status(200).json({ data: oneItem });
    } else {
        res.status(400).json({
            status: 400,
            message: "That item does not exist in the database",
        });
    }
};

const getCompanyById = (req, res) => {
    const id = req.params.id;
    const oneItem = items.find(
        (item) => item._id == id
    );
    const findCompanyId = oneItem.companyId
    const findCompany = companies.find(
        (company) => company._id == findCompanyId)
    if (findCompany) {
        res.status(200).json({ data: findCompany });
    } else {
        res.status(400).json({
            status: 400,
            message: "That company does not exist in the database",
        });
    }
};

module.exports = {
    getSingleItem,
    getCompanyById
};






