import { ActionSheet } from "native-base";

class DeckAction {
    static GET_ALL_DECKS = "GET_ALL_DECKS";
    static SAVE_DECK = "SAVE_DECK"
    static SAVE_CARD = "SAVE_CARD"
    static REMOVE_DECK = "REMOVE_DECK"
    static GET_DECK_QUESTIONS = "GET_DECK_QUESTIONS"
    static getAllDecks = ( data ) => {
        return {
            type: this.GET_ALL_DECKS,
            data: data
        }
    }
    static saveDeck = ( data ) => {
        return {
            type: this.SAVE_DECK,
            data
        }
    }
    static saveCard = ( data ) => {
        return {
            type: this.SAVE_CARD,
            data
        }
    }
    static removeDeck = ( title ) => {
        console.log( "in", title )
        return {
            type: this.REMOVE_DECK,
            title
        }
    }
    static getQuestionLengthByTitle = ( title ) => {
        return {
            type: this.GET_DECK_QUESTIONS,
            title
        }
    }
}
export default DeckAction