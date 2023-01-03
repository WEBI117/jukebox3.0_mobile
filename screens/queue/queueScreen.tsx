import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import tw from 'twrnc'
import screenProps from '../../interfaces/screenProps';
import { io } from "socket.io-client"
import queueScreenProps from './propsInterface';
import httphelper from '../../helpers/httphelper';
import CustomScrollableList from '../../components/scrollablelist';
import { screenNames } from '../../constants';
import searchScreenProps from '../search/propsInterface';

const queueScreen = (props: screenProps<queueScreenProps>) => {

    const [songQueue, setSongQueue] = useState<any[]>([])

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
                    var Queue = await httphelper.getQueueFromServer(props.propsObj.serverURL)
                    if (Queue) {
                        setSongQueue(Queue)
                    }
                    else {
                        console.log("Server returned undefined queue")
                    }
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

    return (
        <View style={tw`w-full h-full flex flex-col items-center justify-start`}>

            <View
                //style={tw`h-10 w-full bg-red-500`}
                style={tw`h-1/12 w-full`}
            ></View>

            <View style={tw`h-2/3 w-3/4 bg-blue-200`}>
                <CustomScrollableList
                    data={songQueue}
                    renderItem={(song) => {
                        return (
                            <View style={tw`flex flex-row w-full h-10 items-center justify-start`}>
                                <Text>
                                    {song.name}
                                </Text>
                            </View>
                        )
                    }}
                    keyExtractor={(song) => song.name}
                />
            </View>

            <View style={tw`w-4 h-1/24`}></View>

            <View style={tw`w-3/4 h-1/12`}>
                <TouchableOpacity
                    style={tw`h-full w-full flex flex-row justify-center items-center bg-blue-500`}

                    // TODO: Navigate to adding screen song.
                    onPress={() => {
                        var queuescreenprops: Partial<searchScreenProps> = {
                            serverURL: props.propsObj.serverURL
                        }
                        props.setScreenNameAndProps({
                            screenName: screenNames.search,
                            props: queuescreenprops
                        })
                    }}

                // TODO: disable button if song already in queue.
                //disabled={!props.searchEnabled}
                >
                    <Text>Add song</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default queueScreen