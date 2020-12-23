import React, {Component} from 'react';
import User from './User.jsx';
import PropTypes from 'prop-types';

class UserList extends Component {
    render() {
        return (
            <ul>{
                this.props.users.map((user) => {
                    return <User
                                user={user}
                                key={user.id}
                                {...this.props}
                            />
                })
            }</ul>
        );
    }
}

UserList.propTypes = {
    users: PropTypes.array.isRequired
    // setUser: PropTypes.func.isRequired,
    // activeUser: PropTypes.object.isRequired
}

export default UserList;