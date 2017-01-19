import React from 'react';
import PriceInfo from './PriceInfo';

export default class StockInfo extends React.Component {
    render() {
        var stock = this.props.stock;
        if (stock.ticker.length === 0) {
            return null;
        }

        return (<div id="stockCard">
            <div className="stockInfo">
                <div className="name">
                    <div className="largeText">{stock.stockName}</div>
                    <div className="smallText">NAME</div>
                </div>
                <div className="ticker">
                    <div className="largeText">{stock.ticker}</div>
                    <div className="smallText">TICKER</div>
                </div>
            </div>
            <PriceInfo price={stock.price}/>
        </div>);
    }
}