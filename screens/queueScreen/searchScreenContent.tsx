import React, { useState, useEffect } from 'react';
import tw from 'twrnc'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import CustomTextInput from '../../components/textinput'
import CustomScrollableList from '../../components/scrollablelist'
import axios from 'axios'

interface song {
    name: string
}

interface Props {
    serverURL: string
}

const searchSongContent = (props: Props) => {
    const [searchTextValue, setSearchTextVaule] = useState<string>('')
    const [searchedSongList, setsearchedSongList] = useState<song>([])
    useEffect((() => {
        console.log(searchTextValue)
    }), [searchTextValue])

    const searchButtonHandler = async () => {
        try {
            console.log('sendingRequest')
            var result = await axios({
                method: 'get',
                url: props.serverURL + 'search',
                params: {
                    // TODO: sanitize searchtext before sending to server.
                    searchstring: searchTextValue
                }
            })
            if (result.status === 200) {
                setsearchedSongList(result.data)
                console.log(result.data.length)
            }
            console.log(result.status)
        }
        catch (err) {
            console.log("err occoured")
            console.log(err)
        }
    }

            //<View style={tw`w-full h-1/12`}></View>
    return (
        <View style={tw`w-full h-full flex flex-col justify-start items-center`}>

            <CustomTextInput stateSetter={setSearchTextVaule} deaultvalue='Search' />

            <View style={tw`h-2/3 w-3/4`}>
                <CustomScrollableList
                    data={searchedSongList}
                    renderItem={({ name }) => {
                        return <View>
                            <Text>
                                {name}
                            </Text>
                        </View>
                    }}
                    keyExtractor={({ name }) => name}
                />
            </View>


            <View style={tw`w-full h-1/12`}>
                <Button onPress={() => {
                    searchButtonHandler()
                }} title='search'></Button>
            </View>
        </View>
    )
}
export default searchSongContent