import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTopics } from './../action/topics';
import url from './../tool/urlSet';
import { get } from './../tool/fetch';

class App extends Component {

    constructor(props) {
        super(props)
        this.tabs = [
            { id: 0, tabName: '全部', type: '' },
            { id: 1, tabName: '精华', type: 'good' },
            { id: 2, tabName: '分享', type: 'share' },
            { id: 3, tabName: '问答', type: 'ask' },
            { id: 4, tabName: '招聘', type: 'job' },
        ]
        this.state = {
            currentTab: 0
        }
    }

    componentDidMount() {
        this._getTopics()
    }

    _getTopics = (type) => {
        this.props.getTopics(type)
    }

    _tabEvent(item, i) {
        this.setState({
            currentTab: i
        })
        console.log(item.type)
        this._getTopics(item.type)
    }

    renderHeader = () => {
        return (
            <div className="tab-header">
            {
                this.tabs.map((item, i) => {
                    let tabActive = this.state.currentTab == i?'tab active':'tab';
                    return (
                        <span className={tabActive} key={i} onClick={() => this._tabEvent(item, i)}>{ item.tabName }</span>
                    )
                })
            }
            </div>
        )
    }

    render() {
        const { topics } = this.props;

        return (
            <div className="topics">
                { this.renderHeader() }
                {
                    topics && topics.map((item, index) => {
                        let author = item.author;
                        let create = new Date(item.create_at);
                        let time = create.getFullYear() + '-' + (create.getMonth() + 1) + '-' + create.getDate();
                        return (
                            <div key={index} className="item">
                                <a href="javascript:void(0)" className="head" title={author.loginname}>
                                    <img src={author.avatar_url} />
                                </a>
                                <span className="title">{item.title}</span>
                                <div className="msg">
                                    <span className="count">{ item.reply_count+'/'+item.visit_count }</span>
                                    <span className="time">{ time }</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const stateProps = (state, ownProps) => ({
    topics: state.topics
})

const dispatchProps = (dispatch) => {
    return {
        getTopics: (option) => dispatch(getTopics(option))
    }
}

export default connect(stateProps, dispatchProps)(App)