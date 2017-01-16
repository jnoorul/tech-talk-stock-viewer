import React from 'react';
import SearchBar from './header/SearchBar';
import StockInfo from './content/StockInfo';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "stock" : {
                "ticker": "",
                "stockName": "",
                "price": {}
            },
            "loading":false
        };
        this.onStockSelected = this.onStockSelected.bind(this);
    }

    onStockSelected(event) {
        var ticker = event.target.getAttribute("value");
        var name = event.target.innerText;

        if(ticker.length >0){

            this.setState({"loading":true});

            fetch("/stocks/price/"+ticker).then((res)=>{
                return res.json();
            }).then((jsonData)=>{
                this.setState({
                    "stock" : {
                        "ticker": ticker,
                        "stockName": name,
                        "price": {
                            "open":jsonData[0],
                            "close":jsonData[1],
                            "high":jsonData[2],
                            "low":jsonData[3]
                        }
                    },
                    "loading": false
                });
            });
        }
    }

    render() {
        return (
            <div>
                <div id="header">
                    <SearchBar onStockSelected={this.onStockSelected} />
                </div>
                <div id="mainContent">
                    {(this.state.loading)?<div className="cssload-box-loading"></div>:<StockInfo stock={this.state.stock}/>}
                </div>
            </div>
        );
    }
}

export default Home;