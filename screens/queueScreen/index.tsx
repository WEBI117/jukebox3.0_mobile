import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import screenNames from '../screenNames';
import screenProps from '../../interfaces/screenProps';
import { io } from 'socket.io-client'
import axios from 'axios'
import tw from 'twrnc'
import MainContent from './mainContent';
import DisconnectedContent from './disconnectedContent'
const socketUrl = 'http://192.168.0.109:3002'
const url = 'http://192.168.0.109:3000/'
const httpsurl = 'https://192.168.0.109:3443/'

const queueScreen = (props: screenProps) => {

    const [socket, setSocket] = useState<any>()
    const [serverSongQueue, setServerSongQueue] = useState<any>([])
    const [content, setContent] = useState<any>(<DisconnectedContent />)
    const socketURL = props.propsObj.serverIP + ':3002'
    const serverURL = props.propsObj.serverIP + ':3000'

    useEffect(() => {
        // TODO: put if condition to only rerender if current screen is Main Content.
        if (true) {
            setContent(<MainContent songQueue={serverSongQueue}
                searchEnabled={true}
                setContentFunction={setContent} />)
        }
    }, [serverSongQueue])

    useEffect(() => {
        var sock = io(socketURL)
        sock.on('connect', async () => {
            getUpdatedQueueFromServer()
        })
        sock.on('connect_error', (err) => {
            console.log(err)
            console.log('Socket unable to connect to server.')
            setContent(<DisconnectedContent />)
        })
        sock.on('disconnect', () => {
            console.log('Socket disconnected from server.')
        })
        sock.on('queueupdated', getUpdatedQueueFromServer)
        setSocket(sock)
    }, [])


    const getUpdatedQueueFromServer = async () => {
        var resp = await axios({
            method: 'get',
            url: url + '/queue/',

        })
        if (resp.status === 200) {
            setServerSongQueue(resp.data.queue)
        }
        else {
            console.log('unable to get song queue from server.')
            setServerSongQueue([])
        }
    }
    return (
        <View style={tw`w-full h-full flex flex-col items-center justify-start`}>

            <View
                //style={tw`h-10 w-full bg-red-500`}
                style={tw`h-10 w-full`}
            ></View>

            <View style={tw`w-full h-full`}>
                {content}
            </View>

        </View>
    )

}

export default queueScreen