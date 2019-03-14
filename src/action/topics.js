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

const getTopics = () => (dispatch) => {
    return get(url.topics, '', (res) => {
        if (res.success) {
            dispatch(topics(res.data))
        }
    })
}

export {
    topicsAction,
    getTopics
}