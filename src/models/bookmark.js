const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['tool', 'social', 'devs', 'entertainment', 'shopping'],
    }
});

// Create the favicon attribute using the url
bookmarkSchema.virtual('favicon').get(function () {
    url = new URL(this.url);
    return `https://icons.duckduckgo.com/ip3/${url.hostname}.ico`;
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
