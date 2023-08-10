import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';

export default function LlamadasAll() {
    const data = [
        { id: '0', caller: 'Mi Estado', time: 'Hace 30 minutos' },
        { id: '1', caller: 'Amigo 1', time: 'Hace 3 horas' },
        { id: '2', caller: 'Amigo 2', time: 'Hace 6 horas' },
        // Agrega más elementos de datos según sea necesario
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {data.map(item => (
                <TouchableOpacity key={item.id} style={styles.llamadaContainer}>
                    <View style={styles.iconoLlamada} />
                    <View style={styles.textoLlamadaContainer}>
                        <Text style={styles.nombreTexto}>{item.caller}</Text>
                        <Text style={styles.tiempoTexto}>{item.time}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingVertical: 10,
        paddingTop: 30
    },
    llamadaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    iconoLlamada: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2ecc71', // Puedes cambiar el color según necesites
        marginRight: 10,
    },
    textoLlamadaContainer: {
        flex: 1,
    },
    nombreTexto: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tiempoTexto: {
        fontSize: 14,
        color: '#888888',
    },
});
