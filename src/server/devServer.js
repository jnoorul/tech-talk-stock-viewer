var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
import fetch from 'node-fetch';
import StockService from './StockService';

//Programatically starting webpackdev server instead of using command line tool.
//You are tweaking webpack config file programatically for non production purpose.
//adding new entry points specific to webpack dev server.
//entry point (webpack-dev-server/client?) is for client side code listening to webpack dev server using socket
//another entry point (webpack/hot/dev-server) is for hot module replacement.

var config = require("./../webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");

var compiler = webpack(config);
//since we are starting webPackDevServer programtically instead of command line tool,
// it does not have access to webpack.config file. so even if you add hot: true and contentBase values in the config file
// webpackdevserver cannot access those values. so we need to spcify the config values here.

var server = new webpackDevServer(compiler, {
    hot: true,
    contentBase: 'src/build/'
});

server.listen(8080);

//I am smart here hehe :)
//I am accessing express server used by webpack and adding my own endpoints,
// otherwise i have to setup separate server for backend services.
server.app.get("/hello",function(req,res){
    res.send("hello Mr Ameen");
});

var stocks = [];

new StockService().loadStocks()
    .then((response)=>{
        console.log("received results from stock service");
        stocks = response;
        console.log(stocks.length);
    })
    .catch((err)=>{
        console.log(err);
        stocks = [];
    });


server.app.get("/stocks/:searchString",function(req,res){
    let searchStr = req.params.searchString;
    // res.json(stocks);
    if(searchStr.length !== 0 && stocks.length >0){
        var filteredStocks = stocks.filter(function(item){
           if(item.name.toUpperCase().includes(searchStr.toUpperCase())){
               return true;
           }
        });
        res.send(filteredStocks);
    }
});

server.app.get("/stocks/price/:ticker",function(req,res){
    let ticker = req.params.ticker;
    console.log(ticker);
    if(ticker.length !== 0){
        var url = "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker="+ticker+"&date=20170113&qopts.columns=open,close,high,low&api_key=4eMcYrtmrbrWwy7j-6aH";
        fetch(url).then((result)=>{
            return result.json();
        }).then((data)=>{
            console.log(data.datatable.data[0]);
            console.log(data.datatable.data);
            res.send(data.datatable.data[0]);
        });
    }
});
