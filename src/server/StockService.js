import fs from 'fs';
import BabyParser from 'babyparse';
import path from 'path';

export default class StockService {
    loadStocks(){
        console.log("querying stocks from csv file");
        return new Promise(function(resolve,reject){
            fs.readFile(path.resolve(__dirname,"./SP500.csv"),"UTF-8",function(err,csv){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    // console.log(csv);
                    let parsedResults = BabyParser.parse(csv,{"header":true});
                    console.log(parsedResults);
                    resolve(parsedResults.data);
                }
            });
        });
    }
};
