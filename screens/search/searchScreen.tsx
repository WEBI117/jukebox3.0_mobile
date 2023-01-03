import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import tw from 'twrnc'
import CustomTextInput from '../../components/textinput';
import CustomScrollableList from '../../components/scrollablelist';
import screenProps from '../../interfaces/screenProps';
import httphelper from '../../helpers/httphelper';
import searchScreenProps from './propsInterface';





const searchScreen = (props: screenProps<searchScreenProps>) => {
    const [searchList, setSearchList] = useState<any[]>(props.propsObj.searchList != undefined ? props.propsObj.searchList : [])
    const [searchText, setSearchText] = useState<string>(props.propsObj.searchText != undefined ? props.propsObj.searchText : '')

    const songItemPressHandler = (song: any) => {
        var sock = props.propsObj.socket
        if (sock != null) {
            sock.emit('addsong', song, (err: any, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(response)
                return
            })
        }
    }

    return (
        <View style={tw`w-full h-full flex flex-col items-center justify-start`}>

            <View style={tw`h-1/12 w-full`}></View>

            <CustomTextInput stateSetter={setSearchText} defaultvalue='Search Song' />
            <Button title='Search' onPress={async () => {
                setSearchList(await httphelper.getSearchResultFromServer(searchText, props.propsObj.serverURL))
            }} ></Button>

            <View style={tw`w-4 h-1/24`}></View>


            <View style={tw`h-2/3 w-3/4 bg-blue-200`}>
                <CustomScrollableList
                    data={searchList}
                    renderItem={(song) => {
                        return (
                            <TouchableOpacity style={tw`flex flex-row w-full h-10 items-center justify-start`}
                                onPress={() => { songItemPressHandler(song) }}>

                                <Text>
                                    {song.name}
                                </Text>

                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(song) => song.name}
                />
            </View>


        </View>
    )
}

export default searchScreen