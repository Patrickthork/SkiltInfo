import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch,} from 'react-native';
import Collapsible from "react-native-collapsible";




const Collapsed = props => {



    const [collapsed, setCollapsed] = useState(true);

    function toggleExpanded() {
        setCollapsed(!collapsed);
    }


    return(
        <ScrollView>
            <TouchableOpacity onPress={toggleExpanded} >
                <Text style={styles.headerText}>{props.titleOfCollapsible}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} style={styles.header}>
               {props.contentOfCollapsible}
            </Collapsible>
        </ScrollView>
    )
};

const styles = StyleSheet.create({

    header: {
        padding: 10,
        justifyContent: 'center',
    },

    headerText: {
        textAlign: 'left',
        fontSize: 24,
        fontWeight: '500',
        color: 'rgba(0,0,0,1)',

    },
});


export default Collapsed;