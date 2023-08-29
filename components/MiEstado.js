import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dialog } from 'react-native-popup-dialog';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibraryAsync } from 'expo-image-picker';

export default function MiEstado() {
    const [fecha, setFecha] = useState('');
    const [image, setImage] = useState('');
    const [image2, setImage2] = useState('');
    const [EstadoName, setEstadoName] = useState('');
    const [EstadoDescripcion, setEstadoDescripcion] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const navigation = useNavigation();

    const selectImage = async () => {
        try {
            const result = await launchImageLibraryAsync({
                mediaTypes: 'Images', // Puedes cambiar esto según tus necesidades
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                setImage(result.uri);
            }
        } catch (error) {
            console.error('Error seleccionando la imagen:', error);
        }
    };


    const crearEstado = async () => {
        if (fecha === '') {
            console.log('los campos no pueden estar vacios');
            setShowAlertError(true);
            setTimeout(() => {
                setShowAlertError(false);
            }, 600);
            return;
        }

        try {
            const chat = {
                id: new Date().getTime().toString(),
                fecha: fecha,
                estadoName: "Mi estado",
                img: image,
                img2: image2,
                estadoDescrip: EstadoDescripcion,
                createdAt: new Date(),
            };

            console.log(chat)

            let chats = await AsyncStorage.getItem('miestado');
            chats = chats ? JSON.parse(chats) : [];

            chats.push(chat);

            await AsyncStorage.setItem('miestado', JSON.stringify(chats));
            setFecha('');
            setEstadoName('');
            setImage('');
            setImage2('');
            setEstadoDescripcion('')
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 500);
            setTimeout(() => {
                navigation.navigate('Home');
            }, 600);

            console.log('estado creado');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.form}>
            <View style={styles.deFlexImg}>
                {image !== '' && (
                    <Image source={{ uri: image }} style={styles.selectedImage} />
                )}
                {image2 !== '' && (
                    <Image source={{ uri: image2 }} style={styles.selectedImage} />
                )}
            </View>
            <View style={styles.inputsFlex}>
                <TouchableOpacity onPress={selectImage}>
                    <Text style={styles.inputSelecImage}>Seleccionar Imagen del estado                                 </Text>
                </TouchableOpacity>
            </View>





            <View style={styles.inputsFlex}>
                <TextInput
                    style={styles.input}
                    value={EstadoDescripcion}
                    placeholder="Texto del estado"
                    onChangeText={setEstadoDescripcion}
                />
            </View>
            <View style={styles.inputsFlex}>
                <TextInput
                    style={styles.input}
                    value={fecha}
                    placeholder="Fecha"

                    onChangeText={setFecha}
                />
            </View>
            <TouchableOpacity style={styles.guardar} onPress={crearEstado}>
                <Text style={styles.guardarText}>Guardar</Text>
            </TouchableOpacity>
            <Dialog
                visible={showAlert}
                onTouchOutside={() => setShowAlert(false)}
            >
                <View style={styles.agregado}>
                    <Text>Estado Creado!</Text>
                </View>
            </Dialog>
            <Dialog
                visible={showAlertError}
                onTouchOutside={() => setShowAlertError(false)}
            >
                <View style={styles.agregado}>
                    <Text>Todos los campos son requeridos! </Text>
                </View>
            </Dialog>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 1,
        marginTop: 200,
        justifyContent: 'center',
        alignItems: 'center'



    },
    input: {
        paddingHorizontal: 10,
        width: '90%'
    },
    agregado: {
        padding: 20,

    },
    inputsFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: 'rgba(18, 140, 126, 0.2)',
        borderRadius: 20,
        padding: 10

    },
    guardar: {
        backgroundColor: '#128C7E',
        padding: 12,
        borderRadius: 20,
        marginTop: 20,
        width: '100%'
    },
    guardarText: {
        textAlign: 'center',
        color: '#FFf'

    },
    selectedImage: {
        width: 50,
        height: 50,
        marginTop: 10,
        resizeMode: 'cover',
        borderRadius: 100,
        margin: 10
    },

    deFlexImg: {
        flexDirection: 'row'
    },
    inputSelecImage: {
        color: 'rgba(0, 0, 0, 0.4)',
        paddingLeft: 6,
        fontSize: 15,
        width: '100%'
    }
});
