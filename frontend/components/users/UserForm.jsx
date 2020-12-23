import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UserForm extends Component {
    onSubmit(e) {
        e.preventDefault();
        const userDom = this.refs.userName;
        const userName = userDom.value;
        this.props.setUserName(userName);
        userDom.value='';
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)} >
                    <div className='form-group'>
                        <input
                            className='form-control'
                            placeholder='Set Your Name...'
                            type='text'
                            ref='userName'
                        />
                    </div>
                </form>
            </div>
        );
    }
}

UserForm.propTypes = {
    setUserName: PropTypes.func.isRequired
}

export default UserForm;