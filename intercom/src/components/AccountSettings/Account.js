import React from 'react';
import DeleteModal from '../Modal/DeleteModal';

const Account = (props) => {

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="col-md-4">
                    <h3 style={{ marginTop: "0px" }}>
                        Account
                    </h3>
                </div>
                <div className="col-md-8">
                    <div className="row" style={{ paddingLeft: "30px", paddingRight: "15px" }}>
                        <div className="pull-right">
                            <DeleteModal
                                deleteMessage={"Confirm your email address."}
                                target={props.user.id}
                                targetName={props.user.email}
                                handleTarget={props.handleTarget}
                                type={'Delete Account'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;