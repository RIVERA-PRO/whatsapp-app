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
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
export default function InfoPerfil() {
    return (
        <View style={styles.contenedor}>

            <TouchableOpacity style={styles.deFlex}>

                <Ionicons name="key" size={20} color='rgba(0, 0, 0, 0.5)' />
                <View style={styles.deColumnTex}>
                    <Text style={styles.textTitle}>Cuenta</Text>
                    <Text style={styles.textDescripcion}>Notificacion de seguridad, cambiar numero</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deFlex}>

                <MaterialIcons name="security" size={20} color='rgba(0, 0, 0, 0.5)' />
                <View style={styles.deColumnTex}>
                    <Text style={styles.textTitle}>Privacidad</Text>
                    <Text style={styles.textDescripcion}>Bloquear contactos, mensajes temporales</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deFlex}>

                <Entypo name="add-user" size={20} color='rgba(0, 0, 0, 0.5)' />
                <View style={styles.deColumnTex}>
                    <Text style={styles.textTitle}>Avatar</Text>
                    <Text style={styles.textDescripcion}>Crear,editar,administrar foto de perfil</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deFlex}>
                <MaterialIcons name="chat" size={20} color='rgba(0, 0, 0, 0.5)' />

                <View style={styles.deColumnTex}>
                    <Text style={styles.textTitle}>Chats</Text>
                    <Text style={styles.textDescripcion}>Tema,fondos de pantalla, historial</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deFlex}>

                <Ionicons name="notifications" size={20} color='rgba(0, 0, 0, 0.5)' />
                <View style={styles.deColumnTex}>
                    <Text style={styles.textTitle}>Notificaciones</Text>
                    <Text style={styles.textDescripcion}>Tonos de mensaje, grupos y llamdas</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deFlex}>
                <AntDesign name="loading1" size={20} color='rgba(0, 0, 0, 0.5)' />

                <View style={styles.deColumnTex}>
                    <Text style={styles.textTitle}>Almacenamiento y datos</Text>
                    <Text style={styles.textDescripcion}>Uso de red, descarga de multimedia</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deFlex}>

                <MaterialCommunityIcons name="web" size={20} color='rgba(0, 0, 0, 0.5)' />
                <View style={styles.deColumnTex}>
                    <Text style={styles.textTitle}>Idioma de la aplicacion</Text>
                    <Text style={styles.textDescripcion}>Español</Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity style={styles.deFlex}>
                <Ionicons name="ios-help-circle-outline" size={20} color='rgba(0, 0, 0, 0.5)' />

                <View style={styles.deColumnTex}>
                    <Text style={styles.textTitle}>Ayuda</Text>
                    <Text style={styles.textDescripcion}>Centro de ayuda, contactenos, politica de privacidad</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deFlex}>

                <FontAwesome5 name="users" size={20} color='rgba(0, 0, 0, 0.5)' />
                <View style={styles.deColumnTex}>
                    <Text style={styles.textTitle}>Invitar amigos</Text>
                    <Text style={styles.textDescripcion}></Text>
                </View>
            </TouchableOpacity>



        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {

        padding: 20


    },


    deFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingVertical: 15
    },
    textDescripcion: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 14
    },
    textTitle: {
        fontSize: 16
    }
})