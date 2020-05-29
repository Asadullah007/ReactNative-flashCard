import React, { Component } from 'react'
import { Container, Content, Button, Text, Card, Item, Input, Toast, Root } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DeckAction from '../store/actions/deckActions';
import { saveCardToDeck } from '../../utils/data';
class AddCard extends Component {
    state = {
        question: "",
        answer: "",
        error: false,
        showToast: false
    }
    onSubmit = () => {
        const { title, cards } = this.props.navigation.state.params
        if ( this.state.question.trim() != "" && this.state.answer.trim() != "" ) {
            let card = {
                "Question": this.state.question,
                "Answer": this.state.answer,
            }
            this.props.saveCard( { title, card } )
            saveCardToDeck( title, card ).then( res => console.log( res ) )
            this.setState( { question: "", answer: "" } )
            this.props.navigation.navigate( 'DeckView', { cards: cards + 1 } )
        } else {
            Toast.show( {
                text: "Please Fill all input fields",
                buttonText: "Okay",
                type: "danger",
                duration: 3000
            } )
        }
    }
    handleQuestionChange = event => {
        let { text } = event.nativeEvent
        this.setState( {
            question: text
        } );
    };
    handleAnswerChange = event => {
        let { text } = event.nativeEvent
        this.setState( {
            answer: text
        } );
    };

    render() {
        const { title } = this.props.navigation.state.params

        return <Root><Container>
            <Content>
                <Card style={styles.card}>

                    <Item rounded style={styles.textFielld} >
                        <Input placeholder='Question' onChange={this.handleQuestionChange} value={this.state.question} />
                    </Item>
                    <Item rounded style={styles.textFielld} >
                        <Input placeholder='Answer' onChange={this.handleAnswerChange} value={this.state.answer} />
                    </Item>
                    <Button primary rounded style={styles.btn} onPress={this.onSubmit}><Text style={styles.txt}> Submit </Text></Button>
                </Card>
            </Content>
        </Container></Root>
    }
}
const styles = StyleSheet.create( {
    card: {
        width: "80%",
        marginLeft: "10%",
    },
    textFielld: {
        marginTop: 20,
        marginLeft: 30,
        paddingLeft: 10,
        width: "80%",

    },
    btn: {
        marginTop: 40,
        marginLeft: 30,
        width: "80%",
        marginBottom: 5,
        flex: 1,
    },
    txt: {
        color: "white",
        fontSize: 20
    },
    title: {
        fontSize: 25,
        marginLeft: "30%",
    },
    number: {
        fontSize: 15,
        marginLeft: "30%",
    }
} )

const mapDispatchToProps = ( dispatch ) => {
    return {
        saveCard: ( data ) => dispatch( DeckAction.saveCard( data ) ),
        getLength: ( title ) => dispatch( DeckAction.getQuestionLengthByTitle( title ) )
    }
}
const mapStateToProps = ( state ) => {
    return {
        cards: state.deckReducer.questionForLength
    }
}
export default connect( mapStateToProps, mapDispatchToProps )( AddCard )