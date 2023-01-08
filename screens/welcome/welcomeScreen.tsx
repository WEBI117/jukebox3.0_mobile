import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import tw from '../../twrncCustom'
import ServerConnectionScreen from '../server_connection/serverConnectionScreen'
import { screenNames } from '../../constants';
import screenProps from '../../interfaces/screenProps';
import welcomeScreenProps from './propsInterface';
import navigation from '../../helpers/navigation';
import CustomButton from '../../components/custombutton'
import CustomBackButton from '../../components/customBackButton';
import serverConnectionScreenProps from '../server_connection/propsInterface'


const welcomeScreen = (props: screenProps<welcomeScreenProps>) => {
    const BackButtonHandler = () => {
        var propsToSave: welcomeScreenProps = {
        }
        navigation.navigate(screenNames.welcome, propsToSave, screenNames.welcome, {}, props.setScreenNameAndProps)
    }
    const navigateForwardHandler = () => {
        var propsToSave: welcomeScreenProps = {
        }
        var propsToSend: Partial<serverConnectionScreenProps> = {

        }
        navigation.navigate(screenNames.welcome, propsToSave, screenNames.connectServer,
            propsToSend, props.setScreenNameAndProps)
    }

    return (
        <View style={tw`flex flex-col w-full h-full justify-start items-center`}>
            {/*seperator*/}
            <View style={tw`h-1/22 w-full`}></View>
            <CustomBackButton clickHandler={BackButtonHandler}/>

            {/*Page Title*/}
            <View style={tw`h-1/8 w-full`}></View>
            <View style={tw`w-full flex flex-col justify-start items-center`}>
                <Text style={tw`text-3xl text-cpink-100`}>Welcome </Text>
                <Text style={tw`text-3xl text-cpink-100`}>to</Text>
                <Text style={tw`text-3xl text-cpink-100`}>JukeBox</Text>
            </View>

            {/* Button to navigate to another screen....may extract into a custom component*/}
            <View style={tw`h-1/8 w-full`}></View>
            <CustomButton clickHandler={navigateForwardHandler} title='Connect to Server' />
        </View>
    )
}

export default welcomeScreen
