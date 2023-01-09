import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import tw from '../../twrncCustom';
import CustomTextInput from '../../components/textinput';
import CustomScrollableList from '../../components/scrollablelist';
import screenProps from '../../interfaces/screenProps';
import httphelper from '../../helpers/httphelper';
import searchScreenProps from './propsInterface';
import { screenNames } from '../../constants';
import navigation from '../../helpers/navigation';
import queueScreenProps from '../queue/propsInterface';





const searchScreen = (props: screenProps<searchScreenProps>) => {
    const [searchList, setSearchList] = useState<any[]>(props.propsObj.searchList != undefined ? props.propsObj.searchList : [])
    const [searchText, setSearchText] = useState<string>(props.propsObj.searchText != undefined ? props.propsObj.searchText : '')
    const [requestLoading, setRequestLoading] = useState<boolean>(false)

    const songItemPressHandler = (song: any) => {
        // TODO: Call Server endpoint to get updated list of songs and ensure added song does not already exist in list.
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

    // To Queue Screen
    const BackButtonHandler = () => {
        var propsToSave: Partial<searchScreenProps> = {
            serverURL: props.propsObj.serverURL,
            searchList: searchList,
            searchText: searchText
        }

        var propsForNextScreen = navigation.getContext(screenNames.search)
        navigation.navigate(screenNames.search, propsToSave, screenNames.queue, propsForNextScreen, props.setScreenNameAndProps)
    }

    // To Queue Screen
    const navigateForwardHandler = () => {
        var propsToSave: Partial<searchScreenProps> = {
            serverURL: props.propsObj.serverURL,
            searchList: searchList,
            searchText: ''
        }

        var propsForNextScreen: Partial<queueScreenProps> = navigation.getContext(screenNames.search)
        navigation.navigate(screenNames.search, propsToSave, screenNames.queue, propsForNextScreen, props.setScreenNameAndProps)
    }

    const searchButtonHandler = async () => {
        setRequestLoading(true)
        setSearchList(await httphelper.getSearchResultFromServer(searchText, props.propsObj.serverURL))
        setRequestLoading(false)
    }
    // For Testing
    useEffect(() => {
        //console.log(props.propsObj)
    }, [])

    const loadingContent = () => {
        if (requestLoading) {
            return (
                <Text>Loading...</Text>
            )
        }
        return (
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
                keyExtractor={(song) => song.id}
            />
        )
    }

    return (
        <View style={tw`w-full h-full flex flex-col items-center justify-start`}>

            <View style={tw`h-1/12 w-full`}></View>

            <View style={tw`flex flex-row items-center justify-start w-full`}>
                <Button onPress={() => { BackButtonHandler() }} title='< Back'></Button>
            </View>

            <CustomTextInput stateSetter={setSearchText} defaultvalue={props.propsObj.searchText != undefined && props.propsObj.searchText != '' ? props.propsObj.searchText : 'Search'} />
            <Button title='Search' onPress={async () => {
                setRequestLoading(true)
                setSearchList(await httphelper.getSearchResultFromServer(searchText, props.propsObj.serverURL))
                setRequestLoading(false)
            }} ></Button>

            <View style={tw`w-4 h-1/24`}></View>

            <View style={tw`h-2/3 w-3/4`}>
                {loadingContent()}
            </View>


        </View>
    )
}

export default searchScreen
