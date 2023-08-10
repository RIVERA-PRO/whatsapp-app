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
export default function SeguridadChat() {
    return (
        <View style={styles.seguridadChatContain}>

            <TouchableOpacity  >
                <View style={styles.seguridadFlex}>

                    <MaterialCommunityIcons name="shield" size={20} color='rgba(0, 0, 0, 0.6)' style={styles.icon} />
                    <View>
                        <Text style={styles.seguridadTextTitle}>Personalizar privacidad</Text>
                        <Text style={styles.seguridadText}>Personalizar las opciones de privacidad para cada contacto/ grupo por separado</Text>
                    </View>


                    <View style={styles.input}>
                        <Text style={styles.inputText}></Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity  >
                <View style={styles.seguridadFlex}>


                    <FontAwesome5 name="eye-slash" size={20} color='rgba(0, 0, 0, 0.6)' style={styles.icon} />
                    <View>
                        <Text style={styles.seguridadTextTitle}>Ocultar nombre de contacto</Text>
                        <Text style={styles.seguridadText}></Text>
                    </View>


                    <View style={styles.input}>
                        <Text style={styles.inputText}></Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity  >
                <View style={styles.seguridadFlex}>

                    <AntDesign name="closecircle" size={20} color='rgba(0, 0, 0, 0.6)' style={styles.icon} />
                    <View>
                        <Text style={styles.seguridadTextTitle}>Security</Text>
                        <Text style={styles.seguridadText}>DESACTIVAR</Text>
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputText}></Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity  >
                <View style={styles.seguridadFlex}>

                    <MaterialCommunityIcons name="phone-hangup" size={20} color='rgba(0, 0, 0, 0.6)' style={styles.icon} />
                    <View>
                        <Text style={styles.seguridadTextTitle}>No calls</Text>
                        <Text style={styles.seguridadText}></Text>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputText}></Text>

                    </View>

                </View>
            </TouchableOpacity>

            <TouchableOpacity  >
                <View style={styles.seguridadFlex}>

                    <MaterialCommunityIcons name="message-text-outline" size={20} color='rgba(0, 0, 0, 0.6)' style={styles.icon} />
                    <View>
                        <Text style={styles.seguridadTextTitle}>Mostrar toast de contacto...</Text>
                        <Text style={styles.seguridadText}></Text>
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
    seguridadChatContain: {
        backgroundColor: '#FFF',
        marginTop: 10

    },
    seguridadFlex: {
        flexDirection: 'row',

        width: '100%',
        paddingHorizontal: 23,
        paddingVertical: 15,
        justifyContent: 'space-between',


    },
    seguridadTextTitle: {
        fontSize: 17,
        color: 'rgba(0, 0, 0, 0.6)',
    },
    seguridadText: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.6)',
        width: 200

    },

    input: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: 20,
        width: 20,
        borderRadius: 100,
        textAlign: 'center',

        justifyContent: 'center'
    },
    inputText: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: 17,
        width: 33,
        borderRadius: 100
    },



})
