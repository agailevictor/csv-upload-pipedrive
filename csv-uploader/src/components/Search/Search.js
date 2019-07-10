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

    handleGetSuggestions(QueryString, callback) {
        var url = 'http://localhost:5000/api/suggestions?value=' + QueryString;
        axios.get(url)
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    onChange = e => {
        var self = this;
        if (e.target.value && e.target.value !== '') {
            var textValue = e.target.value;
            this.handleGetSuggestions(e.target.value, function (list) {
                const userInput = textValue;
                const filteredSuggestions = list.filter(
                    suggestion =>
                        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
                );

                self.setState({
                    activeSuggestion: 0,
                    filteredSuggestions,
                    showSuggestions: true,
                    userInput: textValue
                });
            })
        } else {
            self.setState({
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