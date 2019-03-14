import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTopics } from './../action/topics';
import url from './../tool/urlSet';
import { get } from './../tool/fetch';

class App extends Component {

    componentDidMount() {
        this.props.getTopics()
        // get(url.topics, '', (res) => {
        //     console.log(res)
        // })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                this is a app page.
            </div>
        )
    }
}

const stateProps = (state, ownProps) => {
    topics: state.topics
}

const dispatchProps = (dispatch) => {
    return {
        getTopics: () => dispatch(getTopics())
    }
}

export default connect(stateProps, dispatchProps)(App)