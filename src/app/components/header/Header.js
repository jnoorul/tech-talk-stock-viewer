import React from 'react';
import SearchBar from './SearchBar';

class Header extends React.Component {
    render(){
        return(
            <div id="header">
                <SearchBar />
            </div>
        );
    }
}

export default Header;