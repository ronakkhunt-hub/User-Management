const newsModel = require('../models/newsModel')

exports.createNews = async (req, res) => {
    const newsResult = await newsModel.create(req.body)
    res.status(201).json({ message: "News Posted", data: newsResult });
}

exports.getNews = async (req, res) => {
    const getNews = await newsModel.find().limit(10);
    if (getNews.length < 0) {
        res.status(404).json({ message: 'News not found', data: [] })
    }
    res.status(200).json({ message: "News get", data: getNews });
}

exports.getOneNews = async (req, res) => {
    const getNews = await newsModel.findOne();
    if (!getNews) {
        res.status(404).json({ message: 'News not found', data: [] })
    }
    res.status(200).json({ message: "News get", data: getNews });
}