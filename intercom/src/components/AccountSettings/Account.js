import React from 'react';
import DeleteModal from '../Modal/DeleteModal';
import MessageModal from '../Modal/MessageModal';

const Account = (props) => {

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="col-xs-4 col-sm-4 col-md-4 acct-header">
                    <h3>Account</h3>
                </div>
                <div className="col-xs-8 col-sm-8 col-md-8">
                    <div className="row acct-row">
                        <div className="pull-right">
                        {props.user.accountBalance > 0 
                        ?    <DeleteModal
                                deleteMessage={"Confirm your email address."}
                                target={props.user.id}
                                targetName={props.user.email}
                                handleTarget={props.handleTarget}
                                type={'Delete Account'}
                            />
                        :    <MessageModal
                                type={'Delete Account'}
                            />
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;