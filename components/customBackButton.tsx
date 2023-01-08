import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import tw from '../twrncCustom'

interface Props {
    clickHandler: () => void,
}

const CustomBackButton = (props: Props) => {
    return (
        <View style={tw`w-full flex flex-row justify-start items-center p-3`}>
            <TouchableOpacity style={tw`bg-black flex justify-center items-center`}
                onPress={() => { props.clickHandler() }}>
                <Text style={tw`text-cpink-200`}>{'< Back'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomBackButton

