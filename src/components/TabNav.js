import {
  createAppContainer
} from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs'
import DeckList from "./DeckList";
import NewDeck from "./NewDeck";

const Tabs = createBottomTabNavigator( {
  Decks: {
    screen: DeckList
  },
  AddDeck: {
    screen: NewDeck
  },
} );

export default createAppContainer( Tabs );
