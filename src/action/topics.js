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
/** 
* 主题首页
* @param page Number 页数
* @param tab String 主题分类。目前有 ask share job good
* @param limit Number 每一页的主题数量
* @param mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
*/
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