import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import tw from '../twrncCustom'

interface Props {
    clickHandler: () => void,
    title: string
}

const CustomButton = (props: Props) => {
    return(
            <View style={tw`w-2/3 h-1/12 p-1`}>
                <TouchableOpacity style={tw`bg-cpink-100 flex flex-row justify-center items-center w-full h-full`} 
                onPress={() => {props.clickHandler}}>
                    <Text>{props.title}</Text>
                </TouchableOpacity>
            </View>
          )
}

export default CustomButton

