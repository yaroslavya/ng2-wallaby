var webpackConfig = require("./webpack.karma");

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isUnit = ENV.includes(":unit");
var isIntegration = ENV.includes(":integration");
var isCoverage = ENV.includes(":coverage");
var isMixed = ENV.includes(":mixed");

module.exports = function (config) {

    var cfg = {
        port: 6464,
        browserNoActivityTimeout: 90000,
        basePath: "",
        singleRun: isCoverage,
        frameworks: ["jasmine"],
        reporters: ["mocha"],
        webpack: webpackConfig,
        //Just to boast the compilation time. Still see how tests are ヤドンing the perf.
        //webpackMiddleware: { noInfo: true },
        browsers: ["Chrome"],
        mime: {
            'text/x-typescript': ['ts','tsx']
        }
    };

    //TODO: make dll a common thing for every type of run.
    cfg.files = [
        {
            pattern : "../dll/polyfill.js",
            watched : false,
            served  : true
        },
        {
            pattern : "../dll/ng2vendor.js",
            watched : false,
            served  : true
        },
        "../test/unit-suite.js"
    ];

    cfg.preprocessors = { "../test/unit-suite.js": ["webpack", "sourcemap"] };


    config.set(cfg);
};