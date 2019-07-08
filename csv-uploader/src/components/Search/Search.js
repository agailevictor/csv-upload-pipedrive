import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ""
        };
    }

    handleInputChange = e => {
        console.log(e.target.value);
    }

    onChange = e => {
        // call API and return the results
        // const suggestions = ["White", "Black", "Green", "Blue", "Yellow", "Red"];
        if (e.target.value && e.target.value !== '') {
            var suggestions = [];
            var url = '/api/suggestions?value=' + e.target.value;
            axios.get(url)
                .then(response => {
                    console.log('data : ' + response.data.data);
                    suggestions = response.data.data;
                })
                .catch(error => {
                    console.log('error', error);
                });

            console.log('suggestions : ' + suggestions);
            const userInput = e.currentTarget.value;

            const filteredSuggestions = suggestions.filter(
                suggestion =>
                    suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            );

            this.setState({
                activeSuggestion: 0,
                filteredSuggestions,
                showSuggestions: true,
                userInput: e.currentTarget.value
            });
        } else {
            this.setState({
                userInput: ""
            });
        }
    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    };

    render() {
        const {
            onChange,
            onClick,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;
        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No suggestions</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <div className='input-group'>
                    <input
                        className='form-control input-sm'
                        type='text'
                        id='searchField'
                        placeholder="Search..."
                        maxLength='64'
                        onChange={onChange}
                        value={userInput}
                    />

                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button">Submit</button>
                    </div>
                </div>
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

Search.propTypes = {
    suggestions: PropTypes.instanceOf(Array)
};

export default Search;