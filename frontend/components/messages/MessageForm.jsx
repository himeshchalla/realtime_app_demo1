import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MessageForm extends Component {
    onSubmit(e) {
        e.preventDefault();
        const messageDom = this.refs.message;
        const messageName = messageDom.value;
        this.props.addMessage(messageName);
        messageDom.value='';
    }
    render() {
        let input;
        if(this.props.activeChannel.id !== undefined) {
            input = (
                <input
                    className='form-control'
                    placeholder='Add Message...'
                    type='text'
                    ref='message'
                />
            )
        }
        return (
            <form onSubmit={this.onSubmit.bind(this)} >
                <div className='form-group'>
                    {input}
                </div>
            </form>
        )
    }
}

MessageForm.propTypes = {
    activeChannel: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired
}

export default MessageForm;