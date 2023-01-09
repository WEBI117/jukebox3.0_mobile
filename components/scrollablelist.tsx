import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import tw from '../twrncCustom'; 

interface Props<T> {
    data: T[],
    renderItem: (Item: T) => React.ReactNode
    keyExtractor: (Item: T) => string
}

const customScrollableList = <T extends unknown>(props: Props<T>) => {
    return (
        <ScrollView style={tw`h-full w-full`} contentContainerStyle={tw`h-full w-full p-2`}>
            {props.data.map((Item) => {
                return (
                    //<View key={props.keyExtractor(Item)} style={tw`h-4 w-full`}>
                    <View key={props.keyExtractor(Item)}>
                        {props.renderItem(Item)}
                    </View>
                )
            })}
        </ScrollView>
    )
}

export default customScrollableList
