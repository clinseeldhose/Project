const db = require('../db');

exports.get = async (req, res) => {
    //console.log(req.body);
    cookies = await db.getAllCookie()

    res.status(200).json({
        "cookies": cookies
    });

}

exports.add = async (req, res) => {
    console.log(req.body);

    const { recipe_name, recipe_desc, user_id } = req.body;
    await db.addCookie(req.body)
    res.status(201).json({
        "message:": "Cookie Added"
    });

}


exports.comment = async (req, res) => {
    console.log(req.body);

}

exports.rate = async (req, res) => {
    console.log(req.body);

}

exports.search = async (req, res) => {
    console.log(req.body);

}

