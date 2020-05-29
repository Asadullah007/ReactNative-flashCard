import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Container, DeckSwiper, Card, CardItem, Left, Body, Button, Icon } from 'native-base'
import { connect } from 'react-redux';
import { block } from 'react-native-reanimated';

class Quiz extends Component {
    state = {
        correct: 0,
        totalSwipped: 0,
        completed: false,
    }
    isCorrect = ( correct ) => {
        const { title } = this.props.navigation.state.params
        console.log( this.props.decks[title].questions.length )
        console.log( correct )
        this.setState( ( prevState ) => ( {
            correct: correct == "Correct" ? ++prevState.correct : prevState.correct,
            completed: ++prevState.totalSwipped === this.props.decks[title].questions.length,

        } ) )
    }
    switchToDeck = () => {
        this.clear()
        this.props.navigation.navigate( "DeckView" )
    }

    clear = () => {
        this.setState( ( prevState ) => ( {
            correct: 0,
            completed: 0,
            totalSwipped: 0,
        } ) )
    }
    render() {
        const { title } = this.props.navigation.state.params
        let questions = this.props.decks[title].questions
        const { completed, totalSwipped, correct } = this.state
        console.log( this.state )
        if ( completed ) {
            return <Card style={styles.card}>
                <CardItem style={styles.cardItem} >
                    <Text style={styles.question}>Your Quiz Result is here</Text>
                </CardItem>
                <CardItem style={styles.cardItem} >
                    <Text style={[styles.question, { color: "green" }]}>{correct} correct score from {totalSwipped} </Text>
                </CardItem>

                <Button full style={styles.btn} rounded onPress={this.clear}>
                    <Text style={styles.btnText}>Restart Quiz</Text>
                </Button>
                <Button full style={styles.btn} rounded onPress={this.switchToDeck}>
                    <Text style={styles.btnText}>Back To Deck</Text>
                </Button>
            </Card>
        } else {
            return ( <Container>
                <View >
                    <DeckSwiper
                        ref={c => ( this._deckSwiper = c )}
                        dataSource={questions}
                        renderEmpty={() =>
                            <Card style={styles.card}>
                                <CardItem style={styles.cardItem} >
                                    <Text style={styles.question}>Your Deck has no Cards</Text>
                                </CardItem>


                                <Button full style={styles.btn} primary rounded onPress={() => this.props.navigation.navigate( 'DeckView' )}>
                                    <Text style={styles.btnText}>Back</Text>
                                </Button>

                            </Card>
                        }
                        renderItem={item =>
                            <Card style={styles.card}>
                                <CardItem style={styles.cardItem} >
                                    <Text style={styles.question}>{item.Question}</Text>
                                </CardItem>
                                <CardItem style={styles.cardItem} >
                                    <Text style={[styles.question, { color: "green" }]} onPress={() => alert( `Correct answer is :${ item.Answer }` )}>Show Answer</Text>
                                </CardItem>

                                <Button full style={styles.btn} success rounded onPress={() => this.isCorrect( "Correct" )}>
                                    <Text>Correct</Text>
                                </Button>
                                <Button full style={styles.btn} danger rounded onPress={() => this.isCorrect( "False" )}>
                                    <Text>Incorrect</Text>
                                </Button>
                            </Card>
                        }
                    />
                </View>

            </Container> )

        }
    }

}
let styles = StyleSheet.create( {
    card: {
        height: 400,
        width: "80%",
        marginLeft: "10%",
        elevation: 3
    },
    cardItem: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    question: {
        fontSize: 20,
    },
    btn: {
        width: "80%",
        marginLeft: "10%",
        marginTop: 10,

    },
    btnText: {
        color: "white", fontSize: 18
    }

} )
const mapStateToProps = ( state ) => {
    return {
        decks: state.deckReducer.decks
    }
}

export default connect( mapStateToProps, null )( Quiz )