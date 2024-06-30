const Bookmark = require("../src/models/bookmark");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/thewebs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

const seedDB = async () => {
  // Remove all bookmarks before seeding
  await Bookmark.deleteMany({});
  const bookmarks = [
    {
      title: "Google",
      url: "https://www.google.com",
      category: "tool",
    },
    {
      title: "Youtube",
      url: "https://www.youtube.com",
      category: "social",
    },
    {
      title: "Facebook",
      url: "https://www.facebook.com",
      category: "social",
    },
    {
      title: "Twitter",
      url: "https://www.twitter.com",
      category: "social",
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com",
      category: "social",
    },
    {
      title: "Github",
      url: "https://www.github.com",
      category: "devs",
    },
    {
      title: "Stack Overflow",
      url: "https://www.stackoverflow.com",
      category: "devs",
    },
    {
      title: "Reddit",
      url: "https://www.reddit.com",
      category: "social",
    },
    {
      title: "Netflix",
      url: "https://www.netflix.com",
      category: "entertainment",
    },
    {
      title: "Twitch",
      url: "https://www.twitch.com",
      category: "social",
    },
    {
      title: "Spotify",
      url: "https://www.spotify.com",
      category: "entertainment",
    },
    {
      title: "Amazon",
      url: "https://www.amazon.com",
      category: "shopping",
    },
    {
      title: "Ebay",
      url: "https://www.ebay.com",
      category: "shopping",
    },
    {
      title: "Craigslist",
      url: "https://www.craigslist.org",
      category: "shopping",
    },
    {
      title: "Amazon Prime Video",
      url: "https://www.amazon.com/gp/video/storefront/",
      category: "entertainment",
    },
  ];

  for (bookmark of bookmarks) {
    const newBookmark = new Bookmark(bookmark);
    await newBookmark.save();
  }

  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDB();
