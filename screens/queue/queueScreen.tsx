import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import tw from '../../twrncCustom';
import screenProps from '../../interfaces/screenProps';
import { io } from "socket.io-client"
import queueScreenProps from './propsInterface';
import httphelper from '../../helpers/httphelper';
import CustomScrollableList from '../../components/scrollablelist';
import { screenNames } from '../../constants';
import searchScreenProps from '../search/propsInterface';
import navigation from '../../helpers/navigation';
import { Socket } from 'dgram';
import CustomButton from '../../components/custombutton'

const queueScreen = (props: screenProps<queueScreenProps>) => {

    const [songQueue, setSongQueue] = useState<any[]>(props.propsObj.songQueue != undefined ? props.propsObj.songQueue : [])

    useEffect(() => {
        (async () => {
            console.log('test')
            try {
                var Queue = await httphelper.getQueueFromServer(props.propsObj.serverURL)
                console.log(Queue.length)
                if (Queue) {
                    setSongQueue(Queue)
                }
                else {
                    console.log("Server returned undefined queue")
                }
            }
            catch (err) {
                console.log(err)
            }
            return
        })()
    }, [])
    useEffect(() => {
        var sock = props.propsObj.socket
        var socketurl = props.propsObj.socketURL
        try {
            if (sock == null) {
                if (socketurl != null) {
                    console.log(`connecting to socketurl: ${socketurl}`)
                    sock = io(socketurl)
                }
                else {
                    console.log('Socket was null and no socketurl received...')
                    // navigate to error screen
                }
            }
            // might not need this if check
            if (sock != null) {
                sock.on('connect', async () => {
                    props.propsObj.setSocket(sock)
                })
                sock.on('connect_error', (err) => {
                    console.log(err)
                    console.log('Socket unable to connect to server.')
                    //TODO: set to disconnected screen
                    //props.propsObj.setContent(<DisconnectedContent />)
                })
                sock.on('disconnect', () => {
                    console.log('Socket disconnected from server.')
                })
                sock.on('queueupdated', async () => {
                    var Queue = await httphelper.getQueueFromServer(props.propsObj.serverURL)
                    if (Queue) {
                        setSongQueue(Queue)
                    }
                    else {
                        console.log("Server returned undefined queue")
                    }
                })
            }
        }
        catch (err) {
            console.log(err)
        }
        // cleanup
        return () => {
            sock?.off('connect')
            sock?.off('connect_error')
            sock?.off('disconnect')
            sock?.off('queueupdated')
        }
    }, [])

    // To Server Connection Screen
    const BackButtonHandler = () => {
        var propsToSave: Partial<queueScreenProps> = {
            socketURL: props.propsObj.socketURL,
            serverURL: props.propsObj.serverURL,
            songQueue: []
        }

        var propsToLoad = navigation.getContext(screenNames.connectServer)
        navigation.navigate(screenNames.queue, propsToSave, screenNames.connectServer, propsToLoad, props.setScreenNameAndProps)
    }

    // To Search Screen
    const navigateForwardHandler = () => {
        var propsToSave: Partial<queueScreenProps> = {
            socketURL: props.propsObj.socketURL,
            serverURL: props.propsObj.serverURL,
            songQueue: songQueue
        }

        var propsToLoad: Partial<searchScreenProps> = navigation.getContext(screenNames.search)
        propsToLoad = {
            serverURL: props.propsObj.serverURL,
            searchText: ''
        }
        navigation.navigate(screenNames.queue, propsToSave, screenNames.search, propsToLoad, props.setScreenNameAndProps)
    }

    return (
        <View style={tw`w-full h-full flex flex-col items-center justify-start`}>

            <View
                //style={tw`h-10 w-full bg-red-500`}
                style={tw`h-1/12 w-full`}
            ></View>

            <View style={tw`flex flex-row items-center justify-start w-full`}>
                <Button onPress={() => { BackButtonHandler() }} title='< Back'></Button>
            </View>

            <View style={tw`h-2/3 w-3/4`}>
                <CustomScrollableList
                    data={songQueue}
                    renderItem={(song) => {
                        return (
                            <View style={tw`flex flex-row w-full h-10 items-center justify-start`}>
                                <Text>
                                    {`${song.name} ${song.uri}`}
                                </Text>
                            </View>
                        )
                    }}
                    keyExtractor={(song) => song.id}
                />
            </View>

            <View style={tw`w-4 h-1/24`}></View>

            <CustomButton clickHandler={navigateForwardHandler} title='Add Song' />
        </View>
    )
}

export default queueScreen
