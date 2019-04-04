import React from 'react';
// import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';

const SearchResults = (props) => {
    return (
        <>
            <div className="blog-sidebar">
                {props.users.map(user => (
                    <div className="media">
                        <div className="media-body">
                            <h4 className="media-heading">{user.displayName}</h4>
                            {user.email}
                            {user.buttonInvite
                                ? <button
                                    className="btn btn-primary btn-noborder-radius hvr-bounce-to-bottom pull-right"
                                    type="button"
                                    onClick={(e) => props.inviteUser(e, user.id)}
                                >
                                    Invite
                                </button>
                                : <button
                                    className="btn btn-primary btn-noborder-radius pull-right"
                                    type="button"
                                    disabled
                                >
                                    Invited
                                </button>
                            }
                        </div>
                    </div>
                ))}
            </div>
            {/* <ListGroup>
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
        </ListGroup> */}
        </>
    );
}

export default SearchResults;