const Path = require("path");
const Webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;

var isTest = ENV.includes("test:");
var isCoverage = ENV.includes(":coverage");
var isNg2 = ENV.includes(":ng2only");

//TODO: remove this after tests.
isNg2 = true;

module.exports = function () {
    var config = {};

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    config.devtool = "cheap-module-source-map";

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    //config.entry = {}; //Fixes breaking change of webpack and karma:

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     */
    config.output = {};

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    config.resolve = {
        extensions: [".ts", ".js", ".json", ".css", ".scss", ".html"]
    };

    var atlOptions = [];

    //needed for the build server as it builds the old Apollo 君 built by glorious Magna 先生
    var tsExclude = isNg2 ? /(node_modules|libs)/ : [];

    if (isTest && !isCoverage) {
        //atlOptions.push("target=es6");
    }

    if (isNg2) {
        atlOptions.push("forkChecker=true");
        atlOptions.push("useTranspileModule=true");
        atlOptions.push("transpileOnly=true");
    }

    if (atlOptions.length > 0) {
        console.info("overriding tsconfig settings with: ", atlOptions)
    }

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        loaders: [
            { test: /\.ts$/, loader: "awesome-typescript-loader?" + atlOptions.join("&"), exclude: tsExclude },
            //{ test: /\.ts$/, loader: "awesome-typescript-loader?{configFileName:'tsconfig.json'}", exclude: /(node_modules|libs)/},
            { test: /\.json$/, loader: "json-loader", exclude: /node_modules/ },
            { test: /\.css$/, loader: "style-loader!css-loader", exclude: /node_modules\/(?!(pikaday)\/).*/ },
            { test: /\.html$/, loader: "html-loader", exclude: /node_modules/ },
            { test: /\.scss$/, loader: isTest ? "empty-string-loader" : "to-string-loader!css-loader!sass-loader", exclude: /node_modules/ },
            { test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: "file-loader?name=./files/[name].[ext]", exclude: /node_modules/ },
            //NOTE: to prevent hacks as below we need to adjust the webpack config to be able to add any loaders depending on the config.

            //HACK: currently theres a problem between the file-loader and hard-source plugin. We should remove this after its fixed.
            { test: /\.(svg|gif)$/, loader: "url-loader", exclude: /node_modules/ },
            { test: /karma-require/, loader: "null-loader"}
        ]
    };

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        // Workaround needed for angular 2 angular/angular#11580
        new Webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            "/src"
        ),
        new Webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" })
        // , new CircularDependencyPlugin({
        //     // exclude detection of files based on a RegExp 
        //     exclude: /a\.js/,
        //     // add errors to webpack instead of warnings 
        //     failOnError: true
        // })
    ];

    if (isNg2) {
        console.log("setting the vendors");
        //config.plugins.push(new CopyWebpackPlugin([{ from: "public" }]));
        config.plugins.push(new CopyWebpackPlugin([{ from: "dll" }]));

        /**
         * Reference: https://www.npmjs.com/package/webpack-bundle-analyzer
         * Uncomment to see what is inside the build bundle
         */
        //config.plugins.push(new BundleAnalyzerPlugin());

        // config.plugins.push(new HtmlWebpackPlugin({
        //     title: "Apollo",
        //     template: "./src/app.ejs",
        //     chunksSortMode: "dependency",
        //     inject: true,
        //     filename: "app.html",
        //     isNg2dev: true
        // }));

        config.plugins.push(new Webpack.DllReferencePlugin({
            context: ".",
            manifest: require("../dll/polyfill-manifest.json")
        }));
        config.plugins.push(new Webpack.DllReferencePlugin({
            context: ".",
            manifest: require("../dll/ng2vendor-manifest.json")
        }));

        config.plugins.push(
            new (require('hard-source-webpack-plugin'))({
                cacheDirectory: __dirname + '/tmp/hard-source/[confighash]',
                recordsPath: __dirname + '/tmp/hard-source/[confighash]/records.json',
                configHash: (require('node-object-hash'))().hash
            })
        );
    }

    return config;
}();
