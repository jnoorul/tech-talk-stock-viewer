//TODO: move this outside of src folder.

var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        app: ["./src/app/index.js"]
    },
    output: {
        path: path.resolve(__dirname, "src/build"),
        filename: "bundle.js"
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    module:{
        loaders:[
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
            {test: /(\.css)$/, loaders: ['style', 'css']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    }
};







/*
 Entry :  webpack starts with this file and find all it is dependencies. Bundles all the javascript files in to one file (bundle.js) and put it in the output directory. 3 way, you can specify entry files.

 1) Single File
 entry:"./webapp/index.js", -- Just a single file

 2) Multiple Entry Files:

 entry: ['./webapp/index.js','./public/src/googleAnalytics.js'],

 -- Multiple entry files. The index.js does not depend on googleanalytics.js but we need google analytics file for our app to run. Something like specifying 2 js files using script tag in html.

 3) Object:
 entry: {
 "indexEntry":'./app/index/index.js',
 "aboutusEntry": './app/aboutus/aboutus.js'
 },
 Output: {
 path: '/dist',
 Filename: "[name].js"
 }

 In the above example, it is not single page application. Multi page… index page and about us are totally independent pages. So we specify multiple entry points. Webpack will generate different output file each entry point. Your html will look below

 //index.html
 <script src="dist/indexEntry.js"></script>

 //AboutUs.html
 <script src="dist/ABoutusEntry.js"></script>

 If you don’t specify [name].js in output file, both file will overwrite the same output file.
 */