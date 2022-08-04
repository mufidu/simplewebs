const express = require('express');
const app = express();
const Eta = require("eta");
const path = require('path');
const methodOverride = require('method-override');
const Bookmark = require('./src/models/bookmark');
const morgan = require('morgan');
const reload = require('reload');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/simplewebs', {
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
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, "dist")));
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
    let { title, url, category, favicon } = req.body;
    if ('https://' !== url.substring(0, 8)) {
        url = 'https://' + url;
    }
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
    let { title, url, category } = req.body;
    if ('https://' !== url.substring(0, 8)) {
        url = 'https://' + url;
    }
    const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, { title, url, category });
    res.redirect(`/bookmarks`);
});

app.delete('/bookmarks/:id', async (req, res) => {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.redirect('/bookmarks');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

reload(app);
