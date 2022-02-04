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
    },
    favicon: {
        type: String,
    }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
