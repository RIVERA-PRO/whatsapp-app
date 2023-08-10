import React, { useState } from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
export default function ButonNewChat() {
    const [showButtons, setShowButtons] = useState(false);

    const handleTouch = () => {
        setShowButtons(!showButtons);
    };

    return (
        <View style={styles.container}>
            {showButtons && (
                <View style={styles.buttonContainer}>

                    <TouchableHighlight onPress={() => console.log('Botón 1 presionado')} underlayColor="transparent" style={styles.button}>
                        <MaterialIcons name="chat" size={24} color="#fff" />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => console.log('Botón 2 presionado')} underlayColor="transparent" style={styles.button}>
                        <MaterialIcons name="chat" size={24} color="#fff" />
                    </TouchableHighlight>
                </View>
            )}
            <TouchableHighlight onPress={handleTouch} underlayColor="transparent" style={styles.touchpad}>
                <View>

                    <Feather name="plus" size={24} color="#ffff" />
                </View>
            </TouchableHighlight>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        position: 'absolute',
        bottom: 30,
        right: 10,
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow color
        shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
        shadowOpacity: 0.2, // iOS shadow opacity
        shadowRadius: 5, // iOS shadow radius
    },

    touchpad: {
        backgroundColor: '#128C7E',
        padding: 15,
        borderRadius: 100,
        marginTop: 10
    },
    touchpadText: {
        color: 'white',
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'column',
        gap: 10
    },
    button: {
        backgroundColor: '#128C7E',
        padding: 15,
        borderRadius: 100,
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow color
        shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
        shadowOpacity: 0.2, // iOS shadow opacity
        shadowRadius: 5, // iOS shadow radius
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
