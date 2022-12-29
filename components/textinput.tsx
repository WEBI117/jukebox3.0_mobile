import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, ShadowPropTypesIOS } from 'react-native';
import tw from 'twrnc'

interface Props {
    stateSetter: any,
    defaultvalue: string,
}

const customTextInput = (props: Props) => {
    return (
        <View style={tw`flex flex-row w-2/3 h-1/6 justify-start items-center`}>
            <TextInput style={tw`flex flex-row border-2 w-full h-2/3 rounded-lg text-base`} defaultValue={props.defaultvalue}
                clearTextOnFocus={true} onChangeText={(text) => { props.stateSetter(text) }}></TextInput>
            {/* <TouchableOpacity style={tw`bg-black w-fill h-full grow`}></TouchableOpacity> */}
        </View>
    )
}

export default customTextInput