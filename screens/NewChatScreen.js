import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import NewChat from '../components/NewChat'
import Header from '../components/HeaderBlanco'
import { LinearGradient } from 'expo-linear-gradient';
export default function NewChatScreen() {
    return (
        <View>
            <View style={styles.header}>
                <LinearGradient colors={['#128C7E', '#128C7E']} style={styles.bg}>
                    <Header />
                </LinearGradient>

            </View>
            <NewChat />
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