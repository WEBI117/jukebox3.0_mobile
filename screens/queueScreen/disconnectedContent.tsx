import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import tw from 'twrnc'

const disconnectedContent = () => {
    return(
        <View style={tw`w-full h-full flex flex-col justify-center items-center`}>
            <Text>
                Disconneted Content
            </Text>
        </View>
    )
}

export default disconnectedContent