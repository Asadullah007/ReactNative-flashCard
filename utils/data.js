import { AsyncStorage } from "react-native"
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
const firstTimeData = {
    React: {
        title: "React",
        questions: [{
            Question: "what is React ?",
            Answer: "FrameWork",
        },
        {
            Question: "what is React ?",
            Answer: "FrameWork",
        }]
    },
}
let STORAGE_KEY = "udacityapp"

export function getInitialData() {
    return getAllDecks()
}

export function getAllDecks( deck ) {
    return AsyncStorage.getItem( STORAGE_KEY )
        .then( ( res ) => {
            if ( res == null ) {
                AsyncStorage.setItem( STORAGE_KEY, JSON.stringify( firstTimeData ) )
                return firstTimeData
            } else {
                return JSON.parse( res )
            }
        } )
}

export function saveDeck( title ) {
    return AsyncStorage.mergeItem( STORAGE_KEY, JSON.stringify( {
        [title]: {
            title: title,
            questions: []
        }
    } ) )
}
export async function saveCardToDeck( title, card ) {
    return AsyncStorage.getItem( STORAGE_KEY )
        .then( record => JSON.parse( record ) )
        .then( result => {
            result[title].questions.push( card )
            AsyncStorage.setItem( STORAGE_KEY, JSON.stringify( result ) )
            return result
        } ).catch( err => {
            console.log( err )
        } )
}
export async function deleteDeck( title ) {
    return AsyncStorage.getItem( STORAGE_KEY )
        .then( record => JSON.parse( record ) )
        .then( result => {
            delete result[title]
            AsyncStorage.setItem( STORAGE_KEY, JSON.stringify( result ) )
            return result
        } ).catch( err => {
            console.log( err )
        } )
}
export function checkForAttemptedQuiz() {
    let nowDate = new Date()
    nowDate = `${ nowDate.getDate() }/${ nowDate.getMonth() + 1 }/${ nowDate.getFullYear() }`

    return AsyncStorage.getItem( 'dateLatestAttempted', ( err, result ) => {
        return ( JSON.parse( result ) === nowDate ) ? true : false
    } )
}
export function initiateNotification() {
    Permissions.askAsync( Permissions.NOTIFICATIONS )
        .then( ( { status } ) => {
            if ( Constants.isDevice && status === 'granted' ) {
                console.log( ' Permission is granted.' )

                Notifications.cancelAllScheduledNotificationsAsync()
                    .then( ( result ) => {
                        console.log( " notification cancelled initially", result )

                        const handleNotification = ( { notificationId } ) => {
                            this.checkForAttemptedQuiz()
                                .then( ( result ) => {
                                    ( result ) && Notifications.dismissNotificationAsync( notificationId )
                                } )
                        }

                        Notifications.addListener( handleNotification );

                        if ( Platform.OS === 'android' ) {
                            Notifications.createChannelAndroidAsync( 'card-reminder', {
                                name: 'card-reminder',
                                sound: true,
                                priority: 'max',
                            } )
                        }

                        const nowDate = new Date()

                        const localNotification = {
                            title: 'Reminder for quiz',
                            body: ` You haven't attemeted  quiz today! `,
                            ios: { sound: true, },
                            android: {
                                channelId: 'card-reminder',
                                color: "#101057",
                            }
                        };

                        let notificationGenerationTime = new Date()
                        let currTime = notificationGenerationTime.getTime()
                        notificationGenerationTime.setHours( 18, 0, 0 )
                        scheduleTime = notificationGenerationTime.getTime()
                        if ( currTime > scheduleTime ) {
                            scheduleTime = scheduleTime + 86400000
                        }

                        const scheduleOptions = {
                            time: scheduleTime,
                            repeat: 'day'
                        }

                        Notifications.scheduleLocalNotificationAsync(
                            localNotification, scheduleOptions
                        );
                        console.log( "Notification successfully Schedualed" )

                    } )
            }

        } )
}
