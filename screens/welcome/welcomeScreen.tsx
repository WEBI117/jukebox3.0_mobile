import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import tw from '../../twrncCustom'
import { screenNames } from '../../constants';
import screenProps from '../../interfaces/screenProps';
import welcomeScreenProps from './propsInterface';
import serverConnectionScreenProps from '../server_connection/propsInterface'
import scanScreenProps from '../scan/propsinterface'
import navigation from '../../helpers/navigation';
import CustomButton from '../../components/custombutton'
import CustomBackButton from '../../components/customBackButton';


const welcomeScreen = (props: screenProps<welcomeScreenProps>) => {
    //METHODS
    // To Welcome Screen (Nowhere)
    const BackButtonHandler = () => {
        var propsToSave: welcomeScreenProps = {}
        navigation.navigate(screenNames.welcome, propsToSave, screenNames.welcome, {}, props.setScreenNameAndProps)
    }
    // To Server Connection Screen
    const navigateForwardHandler = () => {
        var propsToSave: welcomeScreenProps = {}
        //var propsToSend: Partial<serverConnectionScreenProps> = {}
        var propsToSend: Partial<scanScreenProps> = {}
        navigation.navigate(screenNames.welcome, propsToSave, screenNames.scan,
            propsToSend, props.setScreenNameAndProps)
    }

    return (
        <View style={tw`flex flex-col w-full h-full justify-start items-center`}>
            {/*seperator*/}
            <View style={tw`h-1/22 w-full`}></View>

            {/*Button to navigate to previous*/}
            <CustomBackButton clickHandler={BackButtonHandler}/>

            {/*seperator*/}
            <View style={tw`h-1/8 w-full`}></View>

            {/*Page Title*/}
            <View style={tw`w-full flex flex-col justify-start items-center`}>
                <Text style={tw`text-3xl text-white`}>Welcome </Text>
                <Text style={tw`text-3xl text-white`}>to</Text>
                <Text style={tw`text-3xl text-white`}>JukeBox</Text>
            </View>

            {/*seperator*/}
            <View style={tw`h-1/8 w-full`}></View>

            {/* Button to navigate to another screen*/}
            <CustomButton clickHandler={navigateForwardHandler} title='Connect to Server' />
        </View>
    )
}

export default welcomeScreen
