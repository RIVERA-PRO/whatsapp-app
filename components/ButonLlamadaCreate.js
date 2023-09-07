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
    StatusBar
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
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function ButonLlamadaCreate() {
    const isFocused = useIsFocused();

    const navigation = useNavigation();



    const goToNewLlamada = () => {
        navigation.navigate('NewLlamadaSreen');

    };





    return (
        <TouchableOpacity onPress={goToNewLlamada} style={styles.btnNewEstado}>
            <View style={styles.imageCirculo}>
                <Feather name="paperclip" size={24} color="#fff" />
            </View>

            <View style={styles.noResultColumnText}>
                <Text style={styles.estadoText}>Crea una llamada</Text>
                <Text style={styles.dateText}>Comparte un enlace para tu llamda de WhatsApp</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnNewEstado: {
        flexDirection: 'row',
        gap: 13,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 25,
        alignItems: 'center'
    },
    imageCirculo: {
        backgroundColor: '#25D366',
        borderRadius: 100,
        height: 50,
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    estadoText: {
        color: 'rgba(0, 0, 0, 0.9)',
        fontSize: 16
    },
    dateText: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 14,
        width: '80%',
    },
});
