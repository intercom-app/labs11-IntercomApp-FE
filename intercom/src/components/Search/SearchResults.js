import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';

const SearchResults = (props) => {
    console.log("RESULTS", props.users)
    return (
        <ListGroup>
            {props.users.map((user) => {
                return (
                    <ListGroupItem key={user.id}>
                        <ListGroupItemHeading>
                            {user.displayName}
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                            {user.email}
                        </ListGroupItemText>
                        { user.buttonInvite
                        ? <Button color="primary" onClick={(e) => props.inviteUser(e, user.id)}>Invite</Button>
                        : <Button color="secondary" disabled>Invited</Button>
                        }
                        
                    </ListGroupItem>
                )
            })}
        </ListGroup>
    );
}

export default SearchResults;