import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import tw from '../twrncCustom'

interface Props {
    clickHandler: () => void,
}

const CustomBackButton = (props: Props) => {
    return (
        <View style={tw`w-full flex flex-row justify-start items-center p-3`}>
            <TouchableOpacity style={tw`flex justify-center items-center bg-transparent`}
                onPress={() => { props.clickHandler() }}>
                <Text style={tw`text-white`}>{'< Back'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomBackButton

