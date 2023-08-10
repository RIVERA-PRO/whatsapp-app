import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Animated,
    Modal,
    Image,


} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dialog } from "react-native-popup-dialog";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SeguridadChat from './SeguridadChat';
import SituacionChat from './SituacionChat';
import IconosChat from './IconosChat';
import { Foundation } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
export default function BloquearRepor() {
    return (
        <View style={styles.BloquearRepor}>

            <TouchableOpacity  >
                <View style={styles.deFlex}>
                    <Foundation name="prohibited" size={25} color="red" />
                    <Text style={styles.text}>Bloquear</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  >
                <View style={styles.deFlex}>
                    <Fontisto name="dislike" size={18} color="red" />
                    <Text style={styles.text}>Reportar</Text>
                </View>
            </TouchableOpacity>


        </View>
    )
}


const styles = StyleSheet.create({

    BloquearRepor: {
        backgroundColor: '#FFF',
        marginTop: 10,
        padding: 10,
        flexDirection: 'column',

    },
    deFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        padding: 20,
    },
    text: {
        color: 'red',
        fontSize: 15,
        paddingLeft: 10
    }


})