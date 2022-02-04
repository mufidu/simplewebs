const Bookmark = require('../models/bookmark');

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

const seedDB = async () => {
    await Bookmark.deleteMany({});
    const bookmarks = [
        {
            title: 'Google',
            url: 'https://www.google.com',
            category: 'tool',
            favicon: 'https://www.google.com/favicon.ico'
        },
        {
            title: 'Youtube',
            url: 'https://www.youtube.com',
            category: 'social',
            favicon: 'https://www.youtube.com/favicon.ico'
        },
        {
            title: 'Facebook',
            url: 'https://www.facebook.com',
            category: 'social',
            favicon: 'https://www.facebook.com/favicon.ico'
        },
        {
            title: 'Twitter',
            url: 'https://www.twitter.com',
            category: 'social',
            favicon: 'https://www.twitter.com/favicon.ico'
        },
        {
            title: 'Instagram',
            url: 'https://www.instagram.com',
            category: 'social',
            favicon: 'https://www.instagram.com/favicon.ico'
        },
        {
            title: 'Github',
            url: 'https://www.github.com',
            category: 'devs',
            favicon: 'https://www.github.com/favicon.ico'
        },
        {
            title: 'Stack Overflow',
            url: 'https://www.stackoverflow.com',
            category: 'devs',
            favicon: 'https://www.stackoverflow.com/favicon.ico'
        },
        {
            title: 'Reddit',
            url: 'https://www.reddit.com',
            category: 'social',
            favicon: 'https://www.reddit.com/favicon.ico'
        },
        {
            title: 'Netflix',
            url: 'https://www.netflix.com',
            category: 'entertainment',
            favicon: 'https://www.netflix.com/favicon.ico'
        },
        {
            title: 'Twitch',
            url: 'https://www.twitch.com',
            category: 'social',
            favicon: 'https://www.twitch.com/favicon.ico'
        },
        {
            title: 'Spotify',
            url: 'https://www.spotify.com',
            category: 'entertainment',
            favicon: 'https://www.spotify.com/favicon.ico'
        },
        {
            title: 'Amazon',
            url: 'https://www.amazon.com',
            category: 'shopping',
            favicon: 'https://www.amazon.com/favicon.ico'
        },
        {
            title: 'Ebay',
            url: 'https://www.ebay.com',
            category: 'shopping',
            favicon: 'https://www.ebay.com/favicon.ico'
        },
        {
            title: 'Craigslist',
            url: 'https://www.craigslist.org',
            category: 'shopping',
            favicon: 'https://www.craigslist.org/favicon.ico'
        },
        {
            title: 'Amazon Prime Video',
            url: 'https://www.amazon.com/gp/video/storefront/ref=sv_pv_pv_storefront',
            category: 'entertainment',
            favicon: 'https://www.amazon.com/favicon.ico'
        }];

    for (bookmark of bookmarks) {
        const newBookmark = new Bookmark(bookmark);
        await newBookmark.save();
    }

    console.log("Database seeded!")
    mongoose.connection.close();
}

seedDB();
