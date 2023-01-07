import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import screenProps from '../../interfaces/screenProps';
import { screenNames } from '../../constants'
import tw from 'twrnc'
import CustomTextInput from '../../components/textinput'
import queueScreenProps from '../queue/propsInterface';
import httphelper from '../../helpers/httphelper';
import navigation from '../../helpers/navigation';
import serverConnectionScreenProps from './propsInterface';

const ipaddressreference = 'http://192.168.0.109:3002'


const serverConnectionScreen = (props: screenProps<serverConnectionScreenProps>) => {
    const [ipAddress, setIpAddress] = useState<string>(props.propsObj.IpAddress != undefined ? props.propsObj.IpAddress : '')
    const [UserName, setUserName] = useState<string>(props.propsObj.UserName != undefined ? props.propsObj.UserName : '')

    // for testing remove
    useEffect(() => {
        //console.log(props.propsObj)
    },[])

    // To Welcome Screen
    const BackButtonHandler = () => {
        var propsToSave: Partial<serverConnectionScreenProps> = {
            IpAddress: ipAddress,
            UserName: UserName
        }
        var propsToLoad = navigation.getContext(screenNames.welcome)
        navigation.navigate(screenNames.connectServer, propsToSave, screenNames.welcome, propsToLoad, props.setScreenNameAndProps)
    }

    // To Queue Screen
    const navigateForwardHandler = () => {
        var propsToSave: Partial<serverConnectionScreenProps> = {
            IpAddress: ipAddress,
            UserName: UserName
        }
        var ipURL = httphelper.convertStringToURL(ipAddress)
        var propsforqueuescreen: Partial<queueScreenProps> = {
            // TODO: Remove hardcoded port numbers.
            socketURL: ipURL + ":3002",
            serverURL: ipURL + ":3000",
        }
        navigation.navigate(screenNames.connectServer, propsToSave, screenNames.queue, propsforqueuescreen, props.setScreenNameAndProps)
    }

    return (
        <View style={tw`flex flex-col justify-start items-center`}>
            {/*seperator*/}
            <View style={tw`h-1/8 w-full`}></View>

            <View style={tw`flex flex-row items-center justify-start w-full`}>
                <Button onPress={() => { BackButtonHandler() }} title='< Back'></Button>
            </View>

            <Text>Connect to server</Text>

            {/*seperator*/}
            <View style={tw`h-1/8 w-full`}></View>

            <CustomTextInput stateSetter={setIpAddress} defaultvalue={props.propsObj.IpAddress != undefined && props.propsObj.IpAddress != '' ? props.propsObj.IpAddress : 'Ip Address'} />

            <CustomTextInput stateSetter={setUserName} defaultvalue={props.propsObj.UserName != undefined && props.propsObj.UserName != '' ? props.propsObj.UserName : 'Username'} />

            {/*seperator*/}
            <View style={tw`h-1/8 w-full`}></View>

            {/* Button to navigate to another screen....may extract into a custom component*/}
            <View style={tw`w-2/3 h-1/12 p-3`}>
                <TouchableOpacity style={tw`bg-blue-200 flex flex-row justify-center items-center w-full h-full`}
                    onPress={
                        () => {
                            navigateForwardHandler()
                        }
                    }>
                    <Text>Connect</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default serverConnectionScreen