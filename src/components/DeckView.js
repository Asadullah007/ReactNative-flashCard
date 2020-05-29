import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Container, Header, Left, Body, Title, Right, Content, Card, Button } from 'native-base'
import { connect } from 'react-redux'
import DeckAction from '../store/actions/deckActions'
import { deleteDeck } from '../../utils/data'

class DeckView extends Component {
    onDelete = () => {
        const { title } = this.props.navigation.state.params
        deleteDeck( title ).then( rec => console.log( rec ) )
        this.props.removeDeck( title )
        this.props.navigation.navigate( "Home" )
    }
    render() {
        const { title, cards } = this.props.navigation.state.params
        return (
            <Container>

                <Content>
                    <Card style={styles.card}>
                        <View style={styles.itemAlignment}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.number} >{cards} Cards</Text>
                        </View>
                        <Button primary rounded style={styles.btn} onPress={() => this.props.navigation.navigate( "AddCard", { title, cards } )}><Text style={styles.txt}> Add Card </Text></Button>
                        <Button primary rounded style={styles.btn} onPress={() => this.props.navigation.navigate( "Quiz", { title } )}><Text style={styles.txt}> Start Quiz </Text></Button>
                        <Button primary rounded style={styles.btn} onPress={this.onDelete} ><Text style={styles.txt}> Delete </Text></Button>

                    </Card>
                </Content>

            </Container >
        )
    }

}
const styles = StyleSheet.create( {
    card: {
        width: "80%",
        marginLeft: "10%",
    },
    textFielld: {
        marginTop: 200,
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

    },
    number: {
        fontSize: 15
    },
    itemAlignment: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }
} )
const mapDispatchToProps = ( dispatch ) => {
    return {
        removeDeck: ( title ) => dispatch( DeckAction.removeDeck( title ) )
    }
}

export default connect( null, mapDispatchToProps )( DeckView )