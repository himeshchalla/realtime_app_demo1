import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChannelForm extends Component {
    onSubmit(e) {
        e.preventDefault();
        const channelDom = this.refs.channel;
        const channelName = channelDom.value;
        this.props.addChannel(channelName);
        channelDom.value='';
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)} >
                    <div className='form-group'>
                        <input
                            className='form-control'
                            placeholder='Add Channel'
                            type='text'
                            ref='channel'
                        />
                    </div>
                </form>
            </div>
        );
    }
}

ChannelForm.propTypes = {
    addChannel: PropTypes.func.isRequired
}

export default ChannelForm;
