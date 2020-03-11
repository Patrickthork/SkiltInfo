import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const SettingsFilters = props => {
    return (
        <View style={styles.textbox}>
            <TouchableOpacity onPress={props.selector} style={props.selectorStyle}>
                <Text style={props.textStyle}>{props.text}</Text>
            </TouchableOpacity>
            <View style={styles.buttongrp}>
                <TouchableOpacity onPress={props.deleteButton} title={"Verdi"} style={styles.delete}>
                    <Image source={require('../images/delete.png')} style={styles.deleteicon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.editButton} style={styles.edit}>
                    <Image source={require('../images/edit.png')} style={styles.editicon}/>
                </TouchableOpacity>
            </View>
        </View>
    )
    /*return (
        <View>
            {data.map((info, i) =>
                <View style={styles.container} key={i}>
                    <TouchableOpacity>
                        <Text key={i} style={styles.content}>{info}</Text>
                    </TouchableOpacity>
                    <View style={styles.buttongrp}>
                        <TouchableOpacity onPress={() => deleteFilter(data[i])} title={"Verdi"} style={styles.delete}>
                            <Image source={require('../images/delete.png')} style={styles.deleteicon}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>  props.navigation.navigate('Rediger Filter', {toEdit: data[i]})} style={styles.edit}>
                            <Image source={require('../images/edit.png')} style={styles.editicon}/>
                        </TouchableOpacity>
                    </View>
                </View>)}
            <View>
                <TouchableOpacity onPress={() => goToAddNew()}>
                    <Text>Legg til nytt filter</Text>
                    <Image source={require('../images/plus.png')} style={styles.plusicon}/>
                </TouchableOpacity>
            </View>
        </View>)*/
};

const styles = StyleSheet.create({

    deleteicon: {
        height: 30,
        width: 30,
        alignSelf: 'center'
    },
    editicon: {
        height: 30,
        width: 30,
        alignSelf: 'center'
    },
    delete: {
        height: 30,
        width: 60,
        backgroundColor: 'rgb(226,6,0)',
    },
    edit: {
        height: 30,
        width: 60,
        backgroundColor: 'rgb(41,150,255)',
        marginStart: 10,
    },
    buttongrp: {
        position: 'absolute',
        right: 10,
        flexDirection: 'row',
    },
    textbox: {
        margin: 3,
        borderWidth: 3,
        borderRadius: 10,
    },

});
export default SettingsFilters;