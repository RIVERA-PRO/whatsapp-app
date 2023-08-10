import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView,
    Image
} from 'react-native';
import img from '../assets/grupo.jpg'
export default function Grupo() {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Image source={img} style={styles.imagen} />
            <Text style={styles.tiempoTexto}>Presentamos la función Comunidades</Text>
            <Text style={styles.descripcionTexto}>Organiza con facilidad tus grupos relacionados y envía avisos. Ahora tus comunidades, como vecindarios y escuelas, pueden tener su propio espacio.</Text>
            <TouchableOpacity style={styles.iniciarButton}>
                <Text style={styles.iniciarButtonText}>Iniciar tu comunidad</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingVertical: 10,
        paddingTop: 40,
        alignItems: 'center',
    },
    tiempoTexto: {
        fontSize: 24,
        fontWeight: '305',
        marginBottom: 10,
        textAlign: 'center'
    },
    descripcionTexto: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 30,
        marginBottom: 20,
        color: 'rgba(0, 0, 0, 0.6)'
    },
    iniciarButton: {
        backgroundColor: '#128C7E',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
    },
    iniciarButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,

    },
    imagen: {
        width: 300,
        height: 200,
        resizeMode: 'contain', // Ajusta esto según lo que necesites
        marginBottom: 20,
    },
});
