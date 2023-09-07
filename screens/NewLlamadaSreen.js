import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';

import Header from '../components/HeaderBlanco'
import { LinearGradient } from 'expo-linear-gradient';
import NewLlamada from '../components/NewLlamada';
export default function NewLlamadaSreen() {
    return (
        <View>
            <View style={styles.header}>
                <LinearGradient colors={['#128C7E', '#128C7E']} style={styles.bg}>
                    <Header />
                </LinearGradient>

            </View>
            <NewLlamada />
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
        height: 160,
        paddingTop: 50,
    },
})