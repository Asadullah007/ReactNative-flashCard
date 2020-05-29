import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { getInitialData, initiateNotification } from '../../utils/data'
import { Content, Card, CardItem, Body, Container, Header, Left, Title, Right } from 'native-base'
import { connect } from 'react-redux'
import DeckAction from '../store/actions/deckActions'
import { TouchableOpacity } from 'react-native-gesture-handler'
class DeckList extends Component {
    state = {
        decks: {}
    }
    componentDidMount() {
        initiateNotification()
        getInitialData().then( res => {
            this.props.loadDecks( res )
            return this.setState( {
                decks: res
            }
            )
        } )
    }
    render() {
        let { decks } = this.props
        return (
            <Container >
                <Header>
                    <Left />
                    <Body>
                        <Title>All Decks</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 1 }}>
                    {decks ? < ScrollView >
                        {
                            Object.values( decks ).map( ( deck, i ) => <TouchableOpacity onPress={() => this.props.navigation.navigate( "DeckView", { title: deck.title, cards: deck.questions.length } )} key={i}><Card style={styles.container}  >
                                <CardItem header button >
                                    <Text style={styles.text} >{deck.title}</Text>
                                </CardItem>
                                <CardItem  >
                                    <Text>  {deck.questions.length} Cards </Text>
                                </CardItem>
                            </Card>
                            </TouchableOpacity>

                            )
                        }
                    </ScrollView> : <Text>No Decks Found</Text>}
                </View>
            </Container >
        )

    }
}


const styles = StyleSheet.create( {
    container: {
        width: "80%",
        marginLeft: "10%",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "black",
        fontSize: 30,
        justifyContent: "center",
        textAlign: "center",

    }
} )
const mapStateToProps = ( state ) => {
    return {
        decks: state.deckReducer.decks,
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return {
        loadDecks: ( data ) => {
            return dispatch( DeckAction.getAllDecks( data ) )
        }

    }
}
export default connect( mapStateToProps, mapDispatchToProps )( DeckList )

