import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import screenProps from '../interfaces/screenProps';
import {screenNames} from '../constants'
import tw from 'twrnc'
import CustomTextInput from '../components/textinput'

const ipaddressreference = 'http://192.168.0.109:3002'

const serverConnectionScreen = (props: screenProps) => {
    const [ipAddress, setIpAddress] = useState<string>('')
    const [UserName, setUserName] = useState<string>('')

    return (
        <View style={tw`flex flex-col justify-start items-center`}>
            {/*seperator*/}
            <View style={tw`h-1/8 w-full`}></View>

            <Text>Connect to server</Text>

            {/*seperator*/}
            <View style={tw`h-1/8 w-full`}></View>

            <CustomTextInput stateSetter={setIpAddress} deaultvalue='IP Address' />

            <CustomTextInput stateSetter={setUserName} deaultvalue='User Name' />

            {/*seperator*/}
            <View style={tw`h-1/8 w-full`}></View>

            {/* Button to navigate to another screen....may extract into a custom component*/}
            <View style={tw`w-2/3 h-1/12 p-3`}>
                <TouchableOpacity style={tw`bg-blue-200 flex flex-row justify-center items-center w-full h-full`}
                    onPress={() => {
                        props.setScreenNameAndProps(
                            {
                                screenName: screenNames.queue,
                                // TODO: remove hard coded string for testing
                                props: { serverIP: 'http://192.168.100.251' }
                            }
                        )
                    }}>
                    <Text>Connect</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default serverConnectionScreen