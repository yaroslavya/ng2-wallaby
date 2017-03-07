var wallabyWebpack = require('wallaby-webpack');
// if you use the webpack defined variable ENV in any components
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

var webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
        'test/vendor.ts',
        'test/unit/simple.test.js'
    ],

    module: {
        loaders: [
            // if you use templateUrl in your components and want to inline your templates uncomment the below line
            //{test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/},

            // if importing .scss files in your component styleUrls uncomment the following line
            //{ test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
            { test: /\.css$/, loader: 'raw-loader'},
            { test: /\.json$/, loader: 'json-loader'},
            { test: /\.html$/, loader: 'raw-loader'},
            { test: /karma-require/, loader: 'null-loader'},
            { test: /\.scss$/, loader: "null-loader"},
            { test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: "file-loader?name=./files/[name].[ext]"},
            { test: /\.(svg|gif)$/, loader: "url-loader"}
        ]
    },
    plugins: [
        new DefinePlugin({
            'ENV': JSON.stringify(ENV)
        })
    ]
});

module.exports = function () {

    return {
        files: [
            {pattern: 'test/vendor.ts', load: false},
            {pattern: 'test/karma-require.js', load: false},
            {pattern: 'src/**/*.ts', load: false},
            {pattern: 'src/**/*.css', load: false},
            {pattern: 'src/**/*.html', load: false},
            {pattern: 'src/**/*.json', load: false},
            {pattern: 'src/app/**/*.ts', ignore: true},
            {pattern: 'test/**/*test.ts', ignore: true},
            {pattern: 'src/**/*.d.ts', ignore: true}
        ],

        tests: [
            {pattern: 'test/unit/simple.test*', load: false}
        ],

        testFramework: 'jasmine',

        postprocessor: webpackPostprocessor,

        setup: function () {
            window.__moduleBundler.loadTests();
        },

        debug: true
    };
};