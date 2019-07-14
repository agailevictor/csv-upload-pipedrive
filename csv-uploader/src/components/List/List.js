import React from 'react';
import PropTypes from 'prop-types';

const List = ({ searchData }) => {

    const divStyle = {
        paddingTop: '50px'
    };
    return (
        <div style={divStyle}>
            {searchData.length > 0 ? <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Address</th>
                        <th scope="col">Team</th>
                    </tr>
                </thead>
                <tbody>{searchData.map(function (item, key) {
                    return (
                        <tr key={key} id={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.address}</td>
                            <td>{item.team}</td>
                        </tr>
                    )
                })}</tbody>
            </table> : ''}
        </div>
    );
};

List.propTypes = {
    searchData: PropTypes.array.isRequired
};

export default List;