import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

const SearchResults = (props) => {
    console.log("RESULTS", props.users)
    return (
        <ListGroup>
            {props.users.map((user) => {
                return (
                    <ListGroupItem>
                        <ListGroupItemHeading>
                            {user.displayName}
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                            {user.email}
                        </ListGroupItemText>
                    </ListGroupItem>
                )
            })}
        </ListGroup>
    );
}

export default SearchResults;