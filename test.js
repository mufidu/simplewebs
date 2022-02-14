// const faviconFetch = require('favicon-fetch')

// const favicon = faviconFetch({ uri: 'https://en.wikipedia.org/wiki/1986' });

// console.log(favicon);

// const Bookmark = require('./models/bookmark');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/thewebs', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log("Database connected!")
// })

// const seedDB = async () => {
//     await Bookmark.deleteMany({});
//     const bookmark = { title: 'Google', url: 'https://www.google.com', category: 'tool' };
//     const newBookmark = new Bookmark(bookmark);
//     await newBookmark.save();
//     const bookmarks = await Bookmark.findOne({ title: 'Google' });
//     console.log(bookmarks.favicon);
//     db.close();
// }

// seedDB();

console.log(process.env)