
import DeckAction from "../actions/deckActions";
import { ActionSheet } from "native-base";

function deckReducer( state = { decks: null, questionForLength: 0 }, action ) {

    switch ( action.type ) {

        case DeckAction.GET_ALL_DECKS:
            return {
                ...state,
                decks: action.data
            }
        case DeckAction.SAVE_DECK:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.data.title]: {
                        title: action.data.title,
                        questions: []
                    }
                }
            }
        case DeckAction.SAVE_CARD:

            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.data.title]: {
                        ...state.decks[action.data.title],
                        questions: [...state.decks[action.data.title].questions, action.data.card]
                    }
                }
            }
        case DeckAction.REMOVE_DECK:
            delete state.decks[action.title]
            return {
                ...state
            }
        case DeckAction.GET_DECK_QUESTIONS:
            return {
                ...state,
                questionForLength: state.decks != null ? state.decks[action.title].questions.length : 0
            }
        default:
            return state
    }
}
export default deckReducer;