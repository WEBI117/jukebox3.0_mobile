import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import screenNames from './screenNames';
import tw from 'twrnc'

const serverConnectionScreen = (props: {setScreen: (screenname? : string) => JSX.Element, propobj?: any}) => {
    const [ipAddress,setIpAddress] = useState('')
    const [UserName,setUserName] = useState('')

    return (
        <View style={tw`flex flex-col justify-start items-center`}>
            {/*seperator*/}
            <View style={tw`h-1/8 w-full`}></View>

            <Text>Connect to server</Text>

            {/*seperator*/}
            <View style={tw`h-1/8 w-full`}></View>

            <View style={tw`flex flex-row w-2/3 h-1/6 justify-start items-center`}>
                <TextInput style={tw`flex flex-row border-2 w-full h-2/3 rounded-lg text-base`} defaultValue='Server IP' 
                clearTextOnFocus={true} onChangeText={(text) => {setIpAddress}}></TextInput>
                {/* <TouchableOpacity style={tw`bg-black w-fill h-full grow`}></TouchableOpacity> */}
            </View>
            <View style={tw`flex flex-row w-2/3 h-1/6 justify-start items-center`}>
                <TextInput style={tw`flex flex-row border-2 w-full h-2/3 rounded-lg text-base`} defaultValue='UserName' 
                clearTextOnFocus={true} onChangeText={(text) => {setUserName}}></TextInput>
                {/* <TouchableOpacity style={tw`bg-black w-fill h-full grow`}></TouchableOpacity> */}
            </View>

            {/*seperator*/}
            <View style={tw`h-1/8 w-full`}></View>

            {/* Button to navigate to another screen....may extract into a custom component*/}
            <View style={tw`w-2/3 h-1/12 p-3`}>
                <TouchableOpacity style={tw`bg-blue-200 flex flex-row justify-center items-center w-full h-full`} onPress={() => {props.setScreen(screenNames.welcome)}}>
                    <Text>Connect</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default serverConnectionScreen