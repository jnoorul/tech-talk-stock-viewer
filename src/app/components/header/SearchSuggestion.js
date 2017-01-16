import React from 'react';

export default class SearchSuggestion extends React.Component {
    render() {
        return (
            <div className="searchSuggestion">
                <ul>
                    {this.props.searchResults.map(function(item,index){
                        return(<li key={item.ticker} value={item.ticker} onClick={this.props.onClick}>{item.name}</li>)
                    },this)}
                </ul>
            </div>);
    }
}