import url from './../tool/urlSet';
import { get } from './../tool/fetch';

const GET_TOPICS = 'GET_TOPICS';

const topicsAction = {
    GET_TOPICS
}

const topics = (tData) => {
    return {
        type: GET_TOPICS,
        tData
    }
}

const getTopics = (option) => (dispatch) => {
    let params =  option&&option.tab?{
        page: 40,
        tab: option.tab,
        limit: 40,
        mdrender: false
    }:'';
    return get(url.topics, params, (res) => {
        if (res.success) {
            dispatch(topics(res.data))
        }
    })
}

export {
    topicsAction,
    getTopics
}