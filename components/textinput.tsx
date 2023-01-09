import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import tw from '../twrncCustom'

interface Props {
    stateSetter: any,
    defaultvalue: string,
}

const customTextInput = (props: Props) => {
    return (
        <View style={tw`flex flex-row w-2/3 h-1/10 py-2 justify-start items-center border-b-2 border-cpink-100 border-opacity-50`}>
            <TextInput style={tw`flex flex-row w-full h-full pl-4 rounded-lg text-white text-base`} defaultValue={props.defaultvalue}
                clearTextOnFocus={true} onChangeText={(text) => { props.stateSetter(text) }}
                selectionColor={'#ffffff'}
            ></TextInput>
            {/* <TouchableOpacity style={tw`bg-black w-fill h-full grow`}></TouchableOpacity> */}
        </View>
    )
}

export default customTextInput
