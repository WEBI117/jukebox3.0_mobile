import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import tw from 'twrnc'
import ServerConnectionScreen from './serverConnectionScreen'
import screenNames from './screenNames';
import screenProps from '../interfaces/screenProps';
import { useEffect, useState } from 'react';

const welcomeScreen = (props: screenProps) => {
    return(
        <View style={tw`flex flex-col w-full h-full justify-start items-center`}>
            {/*seperator*/}
            <View style={tw`h-1/6 w-full bg-black`}></View>

            {/*Page Title*/}
            <Text>Welcome to JukeBox</Text>

            {/* Button to navigate to another screen....may extract into a custom component*/}
            <View style={tw`w-2/3 h-1/12 p-3`}>
                <TouchableOpacity style={tw`bg-blue-200 flex flex-row justify-center items-center w-full h-full`} 
                onPress={() => props.setScreenNameAndProps({
                    screenName: screenNames.connectServer,
                    props: {test: 'test1'}
                })}>
                    <Text>Connect to server</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default welcomeScreen