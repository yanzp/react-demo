import { topicsAction } from './../action/topics';

const topics = (state = [], action) => {
    console.log('--------------')
    console.log(action.tData)
    switch(action.type) {
        case topicsAction.GET_TOPICS:
            return action.tData
        default:
            return state
    }
}

export default topics