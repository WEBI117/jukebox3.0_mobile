import axios from 'axios';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, ShadowPropTypesIOS } from 'react-native';
import SearchSongContent from './searchScreenContent';
import screenProps from '../../interfaces/screenProps';

interface ScreenProps {
    ServerURL: string,
    SocketURL: string
}

interface Props extends ScreenProps {
    songQueue: any, 
    searchEnabled: boolean, 
    setContentFunction: any
}

const mainContent = (props: Props) => {
    // TODO: Create and set song interface as use state type.
    return (
        <View style={tw`w-full h-full flex flex-col items-center justify-start`}>
            <ScrollView style={tw`h-2/3 w-3/4 bg-blue-200`} contentContainerStyle={tw`h-full w-full p-2`}>
                {props.songQueue.map((songItem: any) => {
                    return (
                        <View style={tw`h-4 w-full`}>
                            <Text>
                                songItem.name
                            </Text>
                        </View>
                    )
                })}
            </ScrollView>
            <View style={tw`w-4 h-1/12`}></View>
            <View style={tw`w-3/4 h-3/12`}>
                <TouchableOpacity
                    style={tw`h-full w-full flex flex-row justify-center items-center bg-blue-500`}
                    onPress={() => props.setContentFunction(<SearchSongContent serverURL={'192.168.100.251:3000'} />)}
                    //onPress={() => console.log('adding song')}
                    disabled={!props.searchEnabled}
                >
                    <Text>Add song</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default mainContent