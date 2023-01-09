import React, { useState, useEffect } from 'react';
import { Text, View  } from 'react-native';
import tw from '../../twrncCustom'
import screenProps from '../../interfaces/screenProps';
import { screenNames } from '../../constants'
import serverConnectionScreenProps from './propsInterface';
import queueScreenProps from '../queue/propsInterface';
import httphelper from '../../helpers/httphelper';
import navigation from '../../helpers/navigation';
import CustomTextInput from '../../components/textinput'
import CustomButton from '../../components/custombutton'
import CustomBackButton from '../../components/customBackButton';

const ipaddressreference = 'http://192.168.0.109:3002'


const serverConnectionScreen = (props: screenProps<serverConnectionScreenProps>) => {
    //HOOKS
    const [ipAddress, setIpAddress] = useState<string>(props.propsObj.IpAddress != undefined ? props.propsObj.IpAddress : '')
    const [UserName, setUserName] = useState<string>(props.propsObj.UserName != undefined ? props.propsObj.UserName : '')
    // for testing remove
    useEffect(() => {
        //console.log(props.propsObj)
    }, [])

    //METHODS
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
        var ipURL = httphelper.convertStringToURL(ipAddress)
        var propsToSave: Partial<serverConnectionScreenProps> = {
            IpAddress: ipAddress,
            UserName: UserName
        }
        var propsforqueuescreen: Partial<queueScreenProps> = {
            // TODO: Remove hardcoded port numbers.
            socketURL: ipURL + ":3002",
            serverURL: ipURL + ":3000",
        }
        navigation.navigate(screenNames.connectServer, propsToSave, screenNames.queue, propsforqueuescreen, props.setScreenNameAndProps)
    }

    return (
        <View style={tw`flex flex-col w-full h-full justify-start items-center`}>
            {/*seperator*/}
            <View style={tw`h-1/22 w-full`}></View>

            {/*Button to navigate to previous screen*/}
            <CustomBackButton clickHandler={BackButtonHandler} />

            {/*seperator*/}
            <View style={tw`h-1/16 w-full`}></View>

            {/*Page title*/}
            <Text style={tw`text-3xl text-cpink-100`}>Connect to server</Text>

            {/*seperator*/}
            <View style={tw`h-1/16 w-full`}></View>

            {/*Ip address input field*/}
            <CustomTextInput stateSetter={setIpAddress} defaultvalue={props.propsObj.IpAddress != undefined && props.propsObj.IpAddress != '' ? props.propsObj.IpAddress : 'Ip Address'} />

            {/*Username input field*/}
            <CustomTextInput stateSetter={setUserName} defaultvalue={props.propsObj.UserName != undefined && props.propsObj.UserName != '' ? props.propsObj.UserName : 'Username'} />

            {/*seperator*/}
            <View style={tw`h-1/8 w-full`}></View>

            {/* Button to navigate to another screen....may extract into a custom component*/}
            <CustomButton title={'Connect'} clickHandler={navigateForwardHandler} />

        </View>
    )
}

export default serverConnectionScreen
