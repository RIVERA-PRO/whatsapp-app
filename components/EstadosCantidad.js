import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function EstadosCantidad() {
    const isFocused = useIsFocused();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        fetchChats();
    }, [isFocused]);

    const fetchChats = async () => {
        try {
            const savedChats = await AsyncStorage.getItem('estados');
            if (savedChats) {
                const parsedChats = JSON.parse(savedChats);
                const orderedChats = parsedChats.reverse();
                setChats(orderedChats);
            }
        } catch (error) {
            console.log('Error fetching estados:', error);
        }
    };

    if (chats.length > 0) {
        return (
            <View style={styles.cantidadNum}>
                <Text ></Text>
            </View>
        );
    } else {
        return null; // No se muestra nada si no hay chats
    }
}

const styles = StyleSheet.create({
    cantidadNum: {
        backgroundColor: '#fff',
        borderRadius: 100,
        width: 10,
        height: 10
    },

});

