import React from 'react';
import { StyleSheet, Text, View, Clipboard, ToastAndroid, Vibration } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

const ItemInfo = props => {

    const longPressHandler = async () => {
        console.log("Long press!");
        await Clipboard.setString(props.id + " " + props.value);
        ToastAndroid.show("Kopiert til utklippstavle", ToastAndroid.SHORT);
        Vibration.vibrate(50);
    }

    return(
            <View style={styles.card}>
                <TouchableOpacity onLongPress={() => longPressHandler()}>
                    <View>
                        <Text style={styles.title}>{props.id}</Text>
                        <Text style={styles.value}>{props.value}</Text>
                    </View>
                </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    card: {
        //Shadow props only work on IOS
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5, //Shadow on Android
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10, //Rounded corners
        marginTop: 10,
        backgroundColor: "lightblue"
    },
    title: {
        fontSize: 18
    }
});

export default ItemInfo;