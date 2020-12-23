import React, {Component} from 'react';
import PropTypes from 'prop-types';

class User extends Component {
    onClick(e) {
        e.preventDefault();
        // const {setUserName, user} = this.props;
        // setUserName(user);
        alert('User clicked!!!');
    }
    render() {
        return (
            <li>
                <a onClick={this.onClick.bind(this)}>
                    {this.props.user.name}
                </a>
            </li>
        );
    }
}

User.propTypes = {
    user: PropTypes.object.isRequired
}

export default User;