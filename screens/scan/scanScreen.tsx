import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import tw from '../../twrncCustom'
import navigation from '../../helpers/navigation';
import scanScreenProps from './propsinterface';
import { screenNames } from '../../constants';
import screenProps from '../../interfaces/screenProps';

export default function scanScreen(props: screenProps<scanScreenProps>) {
    const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = (scannedData: { type: any, data: any }) => {
        setScanned(true);
        if (scannedData.data === '') {
            alert('Error getting data from scan. Try scanning again or entering the server details manually.')
        }
        else {
            navigateForwardHandler(scannedData.data)
        }
        //alert(`Bar code with type ${scannedData.type} and data ${scannedData.data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    var navigateForwardHandler = (ip: string) => {
        var propsToSave = {}
        var propsToLoad = navigation.getContext(screenNames.connectServer)
        propsToLoad.IpAddress = ip
        navigation.navigate(screenNames.scan, propsToSave, screenNames.connectServer, propsToLoad, props.setScreenNameAndProps)
    }

    return (
        <View style={tw`flex flex-col w-full h-full justify-center items-center`}>
            <Text style={tw`text-white`}>
                Scan the QR code to connect to the JukeBox server.
            </Text>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={tw`w-full h-1/2`}
            />
            {/*seperator*/}
            <View style={tw`h-1/22 w-full`}></View>
            <Button onPress={() => { navigateForwardHandler('') }} title='Connect manual' />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}
