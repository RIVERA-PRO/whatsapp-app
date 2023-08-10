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
import { FontAwesome5 } from '@expo/vector-icons';

export default function Notificaciones() {
    return (
        <View style={styles.Notificaciones}>

            <TouchableOpacity  >
                <View style={styles.deFlex}>
                    <View style={styles.textc}>
                        <Ionicons name="notifications" size={24} color='rgba(0, 0, 0, 0.6)' />

                        <Text style={styles.text}>Silenciar notificaciones</Text>
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputText}></Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity  >
                <View style={styles.deFlex}>
                    <View style={styles.textc}>
                        <Ionicons name="musical-note" size={24} color='rgba(0, 0, 0, 0.6)' />

                        <Text style={styles.text}>Personalizar notificaciones</Text>
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputText}></Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity  >
                <View style={styles.deFlex}>
                    <View style={styles.textc}>
                        <Ionicons name="ios-image-sharp" size={24} color='rgba(0, 0, 0, 0.6)' />

                        <Text style={styles.text}>Visivilidad de archivos multied..</Text>
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputText}></Text>
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    Notificaciones: {
        backgroundColor: '#FFF',
        marginTop: 10,
        padding: 10,
    },
    input: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: 20,
        width: 20,
        borderRadius: 100,
        justifyContent: 'center',
    },
    inputText: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: 17,
        width: 33,
        borderRadius: 100,
    },
    deFlex: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 20,
        justifyContent: 'space-between',

        textAlign: 'left',
    },
    text: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.6)',

        textAlign: 'center',
    },
    textc: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20

    },
})
