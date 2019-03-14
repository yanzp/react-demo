import { topicsAction } from './../action/topics';

const initialState = {
    topicsData: []
}

const topics = (state = initialState, action) => {
    console.log(action.tData)
    switch(action.type) {
        case topicsAction.GET_TOPICS:
            return {
                topicsData: action.tData
            }
        default:
            return state
    }
}

export default topics