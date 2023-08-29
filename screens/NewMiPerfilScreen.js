import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';

import Header from '../components/HeaderBlanco'
import { LinearGradient } from 'expo-linear-gradient';
import NewMiPerfil from '../components/NewMiPerfil';
import MiPerfil from '../components/MiPerfil';
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import InfoPerfil from '../components/InfoPerfil';
export default function NewMiPerfilScreen() {
    const navigation = useNavigation();
    const goToHome = () => {
        navigation.navigate('Home');

    };
    return (
        <View style={styles.contenedor}>
            <View style={styles.header}>
                <LinearGradient colors={['#128C7E', '#128C7E']} style={styles.bg}>
                    <TouchableOpacity onPress={goToHome} style={styles.deFlex}>
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                        <Text style={styles.Ajustes}>Ajustes</Text>
                    </TouchableOpacity>
                    <AntDesign name="search1" size={24} color="#fff" />
                </LinearGradient>

            </View>
            <ScrollView>
                <MiPerfil />
                <InfoPerfil />

            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#fff',


    },
    header: {
        width: '100%',
        marginBottom: 20,
        position: 'absolute',
        zIndex: 2,
        top: 0,

    },
    bg: {
        height: 110,
        paddingTop: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    deFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    Ajustes: {
        color: '#fff',
        fontSize: 18
    }
})