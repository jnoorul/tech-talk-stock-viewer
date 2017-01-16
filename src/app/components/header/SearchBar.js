import React from 'react';
import SearchSuggestion from './SearchSuggestion';

export default class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            "searchText":"",
            "searchResults":[]
        };

        this.setSearchText = this.setSearchText.bind(this);
        this.onStockClicked = this.onStockClicked.bind(this);
    }

    setSearchText(event){
        var searchStr = event.target.value;

        this.setState({"searchText":searchStr});
        if(searchStr.length > 0){
            fetch("/stocks/"+searchStr).then((res)=>{
                return res.json();
            }).then((jsonResults)=>{
               this.setState({
                   "searchResults": jsonResults
               });
            });
        }
    }

    onStockClicked(event){
        var ticker = event.target.getAttribute("value");
        var name = event.target.innerText;

        this.setState({
            "searchText": name,
            "searchResults": []
        });

        this.props.onStockSelected(event);
    }




    render(){
        var hasResults = (this.state.searchResults.length > 0);
        return(<div id="searchBar">
            <input type="text" value={this.state.searchText} onChange={this.setSearchText} placeholder="Search by stock name" />
            <button>Go</button>
            {(hasResults)?<SearchSuggestion onClick={this.onStockClicked} searchResults={this.state.searchResults}/>:null}
        </div>);
    }

}