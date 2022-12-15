import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc'
import axios from 'axios'
import { io } from 'socket.io-client'
import WelcomeScreen from './screens/welcomescreen'
import ConnectServerScreen from './screens/serverConnectionScreen'
import screenNames from './screens/screenNames';
const socketUrl = 'http://192.168.0.109:3002'
const url = 'http://192.168.0.109:3000/'
const httpsurl = 'https://192.168.0.109:3443/'

const screenNavigationControllerFunction = (setScreen: any, screenNameToNavigateTo?: string, props?: any)  => {
    var propsobj = {
        setScreen: setScreen, 
        propsobj: props
    }
    if(screenNameToNavigateTo === screenNames.welcome){
        return WelcomeScreen(propsobj)
    }
    if(screenNameToNavigateTo === screenNames.connectServer){
        return ConnectServerScreen(propsobj)
    }
    // TODO: remove testing code
    return ConnectServerScreen(propsobj)
    //return WelcomeScreen({setScreen: setScreen})
}

export default function App() {
    const [screen,setScreen] = useState<string>()
    const[content,setContent] = useState<JSX.Element>(screenNavigationControllerFunction(setScreen))
    useEffect(() => {
        console.log(screen)
        var newContent = screenNavigationControllerFunction(setScreen,screen)
       setContent(newContent) 
    }, [screen])
    return content

    var [searchText, setSearchText] = useState<string>('Search Song Name')
    var [songList, setSongList] = useState([])
    var [socket, setSocket] = useState<any>({})
    useEffect(() => {
        console.log('running socket connect logic')
        var sock = io(socketUrl)
        sock.on('connect', () => {
            console.log(`socket connected with id ${socket.id}`)
        })
        setSocket(sock)
    }, [])

    const searchButtonHandler = async () => {
        try {
            console.log('sendingRequest')
            var result = await axios({
                method: 'get',
                url: url + 'search',
                params: {
                    // TODO: sanitize searchtext before sending to server.
                    searchstring: searchText
                }
            })
            if (result.status === 200) {
                setSongList(result.data)
                console.log(result.data.length)
            }
            console.log(result.status)
        }
        catch (err) {
            console.log("err occoured")
            console.log(err)
        }
    }

    const songItemTouchHandler = async (song: any) => {
        // TODO: Replace HTTP/HTTPS call with socket io.
        if (socket != null) {
            socket.emit('addsong', song, (err: any, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(response)
                return
            })
        }
        //try {
        //    var request = await axios({
        //        method: 'get',
        //        url: httpsurl + 'queue/addsong',
        //        headers: {
        //            'Content-Type': 'application/json'
        //        },
        //        data: {
        //            "song": JSON.stringify(song)
        //        }
        //    })
        //    if (request.status === 200) {
        //        console.log(`Song ${song.name} added successfully to queue`)
        //    }
        //    console.log(`song add request returned status ${request.status}`)
        //}
        //catch (err) {
        //    console.log('Error occured with song add request')
        //    console.log(err.message)
        //}
    }

    return (
        <View style={tw`flex flex-col h-full w-full justify-start items-center bg-blue-100`}>
            <View style={tw`w-full h-1/8`}></View>
            <View style={tw`flex flex-row justify-center items-center w-full`}>
                <TextInput
                    style={tw`w-2/3 border-2 p-4`}
                    value={searchText}
                    onChangeText={(value) => {
                        setSearchText(value)
                    }}
                    clearTextOnFocus={true}
                />
                <Button
                    title='Search'
                    color='black'
                    onPress={async () => {
                        await searchButtonHandler()
                    }}
                />
            </View>
            <View style={tw`w-full h-2`} />
            <ScrollView style={tw`w-full bg-black`} contentContainerStyle={tw`flex flex-col justify-start items-center p-3`}>
                {songList.map((song: any) => {
                    return (
                        <TouchableOpacity style={tw`flex flex-row w-full h-20 justify-start items-center p-2`} key={song.id}
                            onPress={() => {
                                songItemTouchHandler(song)
                            }}
                        >
                            <Text style={tw`text-white`}>
                                {song.name}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: '#fff',
//    alignItems: 'center',
//    justifyContent: 'center',
//  },
//});
