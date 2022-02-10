const express = require('express');
const app = express();
const Eta = require("eta");
const path = require('path');
const methodOverride = require('method-override');
const Bookmark = require('./models/bookmark');
const morgan = require('morgan');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/thewebs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected!")
})

app.engine("eta", Eta.renderFile)
app.set("view engine", "eta")
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("dev"))

const categories = Bookmark.schema.path('category').enumValues;

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/bookmarks', async (req, res) => {
    const bookmarks = await Bookmark.find({});
    res.render('bookmarks/index', { bookmarks, categories });
});

app.get('/bookmarks/new', async (req, res) => {
    const bookmarks = await Bookmark.find({});
    res.render('bookmarks/new', { bookmarks, categories });
});

app.post('/bookmarks', async (req, res) => {
    const { title, url, category, favicon } = req.body;
    const bookmark = new Bookmark({ title, url, category, favicon });
    await bookmark.save();
    res.redirect('/bookmarks');
});

app.get('/bookmarks/:id', async (req, res) => {
    const bookmark = await Bookmark.findById(req.params.id);
    res.render('bookmarks/details', { bookmark });
});

app.get('/bookmarks/:id/edit', async (req, res) => {
    const bookmark = await Bookmark.findById(req.params.id);
    res.render('bookmarks/edit', { bookmark, categories });
});

app.put('/bookmarks/:id', async (req, res) => {
    const { title, url, category } = req.body;
    const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, { title, url, category });
    res.redirect(`/bookmarks/${bookmark._id}`);
});

app.delete('/bookmarks/:id', async (req, res) => {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.redirect('/bookmarks');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
