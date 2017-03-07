const Path = require("path");
const Webpack = require("webpack");

const polyfills = [
    "natex",
    "zone.js",
    "zone.js/dist/zone",
    "reflect-metadata",
    "core-js",
    "zone.js/dist/long-stack-trace-zone.js",
    "interact.js"
];

const vendors = [
    "@angular/platform-browser",
    "@angular/platform-browser-dynamic",
    "@angular/core",
    "@angular/common",
    "@angular/router",
    "@angular/forms",
    "@angular/http",
    "rxjs",
    "ng2-dragula/ng2-dragula",
    "lodash",
    "entity-space",
    "ical.js",    
    "moment",
    "crypto-js"
];

module.exports = function () {
    var config = {};

    config.devtool = "cheap-module-eval-source-map";

    config.entry = {
        polyfill: polyfills,
        ng2vendor: vendors
    };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = {
        path: Path.resolve("dll"),
        filename: "[name].js",
        library: "[name]"
    };

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        extensions: [".ts", ".js", ".json", ".css", ".scss", ".html"]
    };

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        loaders: [
            { test: /\.ts$/, loader: "awesome-typescript-loader?{configFileName:'tsconfig.json'}", exclude: /node_modules/ },
            { test: /\.json$/, loader: "json-loader", exclude: /node_modules/ },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.html$/, loader: "html-loader", exclude: /node_modules/ },
            { test: /\.scss$/, loader: "to-string-loader!css-loader!sass-loader", exclude: /node_modules/},
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: "file-loader?name=./files/[name].[ext]" }
        ]
    };

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        new Webpack.DllPlugin({
            path: Path.resolve("dll/[name]-manifest.json"),
            name: "[name]"
        })
    ];

    return config;
} ();
