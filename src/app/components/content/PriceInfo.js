import React from 'react';

export default class PriceInfo extends React.Component {
    render(){
        var price = this.props.price;
        return(
            <div className="priceInfo">
                <div className="details">
                    <div className="largeText">{price.open}</div>
                    <div className="smallText">OPEN</div>
                </div>
                <div className="details">
                    <div className="largeText">{price.close}</div>
                    <div className="smallText">CLOSE</div>
                </div>
                <div className="details">
                    <div className="largeText">{price.high}</div>
                    <div className="smallText">HIGH</div>
                </div>
                <div className="details">
                    <div className="largeText">{price.low}</div>
                    <div className="smallText">LOW</div>
                </div>
            </div>
        );
    }
}