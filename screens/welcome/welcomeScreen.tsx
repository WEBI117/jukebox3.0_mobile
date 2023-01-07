import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import tw from 'twrnc'
import ServerConnectionScreen from '../server_connection/serverConnectionScreen'
import { screenNames } from '../../constants';
import screenProps from '../../interfaces/screenProps';
import welcomeScreenProps from './propsInterface';
import navigation from '../../helpers/navigation';


const welcomeScreen = (props: screenProps<welcomeScreenProps>) => {
    const BackButtonHandler = () => {
        var propsToSave: welcomeScreenProps = {
        }
        navigation.navigate(screenNames.welcome, propsToSave, screenNames.welcome, {}, props.setScreenNameAndProps)
    }

    return (
        <View style={tw`flex flex-col w-full h-full justify-start items-center`}>
            {/*seperator*/}
            <View style={tw`h-1/6 w-full bg-black`}></View>
            <View style={tw`flex flex-row items-center justify-start w-full`}>
                <Button onPress={() => { BackButtonHandler() }} title='< Back'></Button>
            </View>

            {/*Page Title*/}
            <Text>Welcome to JukeBox</Text>

            {/* Button to navigate to another screen....may extract into a custom component*/}
            <View style={tw`w-2/3 h-1/12 p-3`}>
                <TouchableOpacity style={tw`bg-blue-200 flex flex-row justify-center items-center w-full h-full`}
                    onPress={() => props.setScreenNameAndProps({
                        screenName: screenNames.connectServer,
                        props: { test: 'test1' }
                    })}>
                    <Text>Connect to server</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default welcomeScreen