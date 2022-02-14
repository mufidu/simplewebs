if (process.env.NODE_ENV === "production") {
    module.exports = {
        syntax: 'postcss-scss',
        parser: 'postcss-scss',
        plugins: [
            require("postcss-import"),
            require("postcss-nested"),
            require("autoprefixer"),
            require("cssnano")({
                preset: "default",
            }),
        ],
    };
} else {
    module.exports = {
        syntax: 'postcss-scss',
        parser: 'postcss-scss',
        plugins: [
            require("postcss-import"),
            require("postcss-nested"),
            require("autoprefixer"),
        ],
    };
}