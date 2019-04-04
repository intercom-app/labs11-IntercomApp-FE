import React from 'react';

const SearchResults = (props) => {
    return (
        <>
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
        </>
    );
}

export default SearchResults;