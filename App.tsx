import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc'
import axios from 'axios'
import { io, Socket } from "socket.io-client"
import { ServerToClientEvents, ClientToServerEvents } from './interfaces/socketInterfaces';
import WelcomeScreen from './screens/welcomescreen'
import ConnectServerScreen from './screens/serverConnectionScreen'
import { screenNames } from './constants';
import screenNavigationData from './interfaces/screenNavigationData'
import QueueScreen from './screens/queueScreen';
import SearchScreen from './screens/searchScreen';



export default function App() {

    const screenNavigationControllerFunction = (setScreenData: any, screenName?: string, screenProps?: any) => {
        if (screenName === screenNames.welcome) {
            return <WelcomeScreen setScreenNameAndProps={setScreenData} propsObj={screenProps} />
        }
        if (screenName === screenNames.connectServer) {
            return <ConnectServerScreen setScreenNameAndProps={setScreenData} propsObj={screenProps} />
        }
        if (screenName === screenNames.queue) {
                screenProps.socket = socket
                screenProps.setSocket = setSocket
                return <QueueScreen setScreenNameAndProps={setScreenData} propsObj={screenProps} />
                // TODO: returning to welcome screen for testing...should return to connecte server screen instead.
                //return <WelcomeScreen setScreenNameAndProps={setScreenData} propsObj={screenProps} />
        }
        if(screenName === screenNames.search){
            return <SearchScreen setScreenNameAndProps={setScreenData} propsObj={screenProps} />
        }
        // TODO: remove testing code
        //return ConnectServerScreen(propsForNewScreen)
        return <WelcomeScreen setScreenNameAndProps={setScreenData} propsObj={screenProps} />
    }

    const [currentScreenNameAndProps, setCurrentScreenNameAndProps] = useState<screenNavigationData>()
    const [content, setContent] = useState<JSX.Element>(<WelcomeScreen setScreenNameAndProps={setCurrentScreenNameAndProps} propsObj={{}} />)
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
    //const [serverUrl, setServerUrl] = useState<string>()

    useEffect(() => {
        var newContent = screenNavigationControllerFunction(setCurrentScreenNameAndProps, currentScreenNameAndProps?.screenName, currentScreenNameAndProps?.props)
        setContent(newContent)
    }, [currentScreenNameAndProps])

    return (
        <View style={tw`w-full h-full`}>
            {content}
        </View>
    )

    //    var [searchText, setSearchText] = useState<string>('Search Song Name')
    //    var [songList, setSongList] = useState([])
    //    var [socket, setSocket] = useState<any>({})
    //    useEffect(() => {
    //        console.log('running socket connect logic')
    //        var sock = io(socketUrl)
    //        sock.on('connect', () => {
    //            console.log(`socket connected with id ${socket.id}`)
    //        })
    //        setSocket(sock)
    //    }, [])
    //
    //    const searchButtonHandler = async () => {
    //        try {
    //            console.log('sendingRequest')
    //            var result = await axios({
    //                method: 'get',
    //                url: url + 'search',
    //                params: {
    //                    // TODO: sanitize searchtext before sending to server.
    //                    searchstring: searchText
    //                }
    //            })
    //            if (result.status === 200) {
    //                setSongList(result.data)
    //                console.log(result.data.length)
    //            }
    //            console.log(result.status)
    //        }
    //        catch (err) {
    //            console.log("err occoured")
    //            console.log(err)
    //        }
    //    }
    //
    //    const songItemTouchHandler = async (song: any) => {
    //        // TODO: Replace HTTP/HTTPS call with socket io.
    //        if (socket != null) {
    //            socket.emit('addsong', song, (err: any, response: any) => {
    //                if (err) {
    //                    console.log(err)
    //                    return
    //                }
    //                console.log(response)
    //                return
    //            })
    //        }
    //        //try {
    //        //    var request = await axios({
    //        //        method: 'get',
    //        //        url: httpsurl + 'queue/addsong',
    //        //        headers: {
    //        //            'Content-Type': 'application/json'
    //        //        },
    //        //        data: {
    //        //            "song": JSON.stringify(song)
    //        //        }
    //        //    })
    //        //    if (request.status === 200) {
    //        //        console.log(`Song ${song.name} added successfully to queue`)
    //        //    }
    //        //    console.log(`song add request returned status ${request.status}`)
    //        //}
    //        //catch (err) {
    //        //    console.log('Error occured with song add request')
    //        //    console.log(err.message)
    //        //}
    //    }
    //
    //    return (
    //        <View style={tw`flex flex-col h-full w-full justify-start items-center bg-blue-100`}>
    //            <View style={tw`w-full h-1/8`}></View>
    //            <View style={tw`flex flex-row justify-center items-center w-full`}>
    //                <TextInput
    //                    style={tw`w-2/3 border-2 p-4`}
    //                    value={searchText}
    //                    onChangeText={(value) => {
    //                        setSearchText(value)
    //                    }}
    //                    clearTextOnFocus={true}
    //                />
    //                <Button
    //                    title='Search'
    //                    color='black'
    //                    onPress={async () => {
    //                        await searchButtonHandler()
    //                    }}
    //                />
    //            </View>
    //            <View style={tw`w-full h-2`} />
    //            <ScrollView style={tw`w-full bg-black`} contentContainerStyle={tw`flex flex-col justify-start items-center p-3`}>
    //                {songList.map((song: any) => {
    //                    return (
    //                        <TouchableOpacity style={tw`flex flex-row w-full h-20 justify-start items-center p-2`} key={song.id}
    //                            onPress={() => {
    //                                songItemTouchHandler(song)
    //                            }}
    //                        >
    //                            <Text style={tw`text-white`}>
    //                                {song.name}
    //                            </Text>
    //                        </TouchableOpacity>
    //                    )
    //                })}
    //            </ScrollView>
    //            <StatusBar style="auto" />
    //        </View>
    //    );
}

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: '#fff',
//    alignItems: 'center',
//    justifyContent: 'center',
//  },
//});
