import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Container, Header, Content, Item, Input, Left, Body, Title, Right, Button, Card, Root, Toast } from 'native-base'
import { saveDeck } from '../../utils/data';
import { connect } from 'react-redux';
import DeckAction from '../store/actions/deckActions';

class NewDeck extends Component {
    state = {
        text: ""
    }
    handleChange = event => {
        this.setState( {
            text: event.nativeEvent.text
        } );
    };
    onSubmit = () => {
        let { text } = this.state
        if ( text.trim() != "" ) {
            saveDeck( text ).then( res => console.log( text ) )
            this.props.saveDeck( { title: text } )
            this.setState( { text: "" } )
            this.props.navigation.navigate( 'DeckView', { title: text, cards: 0 } )
        } else {
            Toast.show( {
                text: "Please Fill all input fields",
                buttonText: "Okay",
                type: "danger",
                duration: 3000
            } )
        }


    }
    render() {
        return (
            <Root>
                <Container>
                    <Header>
                        <Left />
                        <Body>
                            <Title>Add New Deck</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <Card style={styles.card}>
                            <Item rounded style={styles.textFielld} >
                                <Input placeholder='Deck Title' onChange={this.handleChange} value={this.state.text} />
                            </Item>
                            <Button primary rounded style={styles.btn} onPress={this.onSubmit}><Text style={styles.txt}> Create Deck </Text></Button>
                        </Card>
                    </Content>

                </Container >
            </Root>
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
    }
} )
const mapDispatchToProps = ( dispatch ) => {
    return {
        saveDeck: ( data ) => {
            return dispatch( DeckAction.saveDeck( data ) )
        }

    }
}
export default connect( null, mapDispatchToProps )( NewDeck )
// export default NewDeck