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
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
export default function LlamadasAll() {
    const isFocused = useIsFocused();
    const [estados, setEstados] = useState([]);
    const navigation = useNavigation();
    const [progress, setProgress] = useState(0);

    const [selectedEstadoId, setSelectedEstadoId] = useState(null);

    const [showStatusBar, setShowStatusBar] = useState(false);
    const [editNumero, setEditNumero] = useState('');
    const [editEstado, setEditEstado] = useState('');
    const [editEstadoId, setEditEstadoId] = useState('');
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editEstado1, setEditEstado1] = useState('');
    const [editEstado2, setEditEstado2] = useState('');
    const [editImg, setEditImg] = useState('');
    const [editNum, setEditNum] = useState('');
    const [editEstate, setEditEstate] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [showModalContainer, setShowModalContainer] = useState(false);
    useEffect(() => {
        fetchEstados();
    }, [isFocused]);



    const fetchEstados = async () => {
        try {
            const savedEstados = await AsyncStorage.getItem('llamadas');
            if (savedEstados) {
                const parsedEstados = JSON.parse(savedEstados);
                const orderedEstados = parsedEstados.reverse().map(estado => ({
                    ...estado,
                    id: estado.id,
                    isSelected: false,

                    img: estado.img,

                }));
                setEstados(orderedEstados);
            }
        } catch (error) {
            console.log('Error fetching estados:', error);
        }
    };





    if (estados.length === 0) {
        return (
            <Text style={styles.noResult}>No hay llamdas</Text>
        );
    }

    const removeSelectedEstado = async () => {
        if (selectedEstadoId) {
            try {
                // Remove the selected estado from AsyncStorage
                const updatedEstados = estados.filter(estado => estado.id !== selectedEstadoId);
                await AsyncStorage.setItem('llamadas', JSON.stringify(updatedEstados));

                // Update the state to reflect the changes
                setEstados(updatedEstados);
                setSelectedEstadoId(null); // Reset the selected estado ID
                setImageModalVisible(false); // Close the modal
            } catch (error) {
                console.log('Error removing estado:', error);
            }
        }
    };

    return (
        <View style={styles.estadosContainer}>
            <Text style={styles.recientes}>Recientes</Text>

            <View >
                {estados.map((estado, index) => (
                    <TouchableOpacity style={styles.estado} key={estado.id}
                        onPress={() => {
                            setSelectedImage(estado.img);
                            setSelectedEstadoId(estado.id);
                            setImageModalVisible(true);
                        }} >


                        <Image
                            source={{ uri: `${estado.img}` }}
                            style={styles.image}
                        />


                        <View style={styles.deFlex2}>
                            <View style={styles.deFlex}>
                                <View style={styles.deColumn}>
                                    <Text style={styles.estadoText}>{estado.estadoName.slice(0, 17)}</Text>
                                    <View style={styles.deFlexLlamada}>

                                        {estado.tipe === "Entrante" ? (
                                            <View>
                                                <Feather name="arrow-down-left" size={16} color="red" />
                                            </View>
                                        ) : (
                                            <View>
                                                <Feather name="arrow-up-right" size={16} color="#25D366" />
                                            </View>
                                        )}
                                        <Text style={styles.dateText}>{estado.fecha.slice(0, 9)}</Text>
                                    </View>
                                </View>

                            </View>
                            <FontAwesome name="phone" size={22} color="#25D366" />
                        </View>



                    </TouchableOpacity>
                ))}
            </View>


            <Modal
                visible={imageModalVisible}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                swipeDirection="left"
                onSwipeComplete={imageModalVisible}
                onBackdropPress={imageModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setImageModalVisible(false)}
            >

                <View style={styles.imageModalContainer}>

                    <View style={styles.headerAtras2}>


                        <TouchableOpacity
                            style={styles.atras}
                            onPress={() => setImageModalVisible(false)}
                        >
                            <AntDesign name="arrowleft" size={24} color="#fff" />
                        </TouchableOpacity>


                        <View style={styles.deFlexCifrado}>
                            <Text style={styles.cifradoText}>Cifrado de extremo a extremo</Text>

                            <FontAwesome name="lock" size={12} color='rgba(255, 255, 255, 0.5)' />
                        </View>

                        <TouchableOpacity style={styles.deFlexHeader2} onPress={() => setShowModalContainer(!showModalContainer)}>
                            <Text style={styles.iconPuntos}>...</Text>
                        </TouchableOpacity>

                    </View>

                    {showModalContainer && <TouchableOpacity
                        style={styles.buttonEliminar}
                        onPress={removeSelectedEstado}
                    >
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>}


                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.fullScreenImage}
                        resizeMode="contain"
                    />

                    <Text style={styles.textEstadoName}>{estados.find(estado => estado.id === selectedEstadoId)?.estadoName.slice(0, 17)}</Text>
                    <Text style={styles.TextLLamando}>Llamando</Text>


                    <View style={styles.footerLlamada}>

                        <FontAwesome5 name="video" size={20} color='rgba(255, 255, 255, 0.9)' />
                        <AntDesign name="sound" size={20} color='rgba(255, 255, 255, 0.9)' />
                        <Entypo name="sound-mute" size={20} color='rgba(255, 255, 255, 0.9)' />

                        <TouchableOpacity
                            style={styles.iconLlamada}
                            onPress={() => setImageModalVisible(false)}
                        >
                            <MaterialCommunityIcons name="phone-hangup" size={24} color='rgba(255, 255, 255, 0.9)' />
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>

            <View style={styles.espacio}>

            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    estadosContainer: {

    },

    estadoText: {
        color: 'rgba(0, 0, 0, 0.9)',
        fontSize: 16
    },

    estado: {
        flexDirection: 'row',
        gap: 13,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15
    },

    dateText: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 14
    },
    headerAtras2: {
        flexDirection: 'row',
        paddingTop: 10,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

    },

    inputsEdit: {
        padding: 20
    },
    inputsFlex: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: 'rgba(18, 140, 126, 0.2)',
        borderRadius: 30,
        padding: 10,
        marginTop: 10,
        borderBottomWidth: 0.3,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    inputsFlex2: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: 'rgba(18, 140, 126, 0.2)',
        borderRadius: 30,
        marginTop: 10,
        borderBottomWidth: 0.3,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    inputEdit: {
        paddingHorizontal: 10,
        justifyContent: 'center',

        width: '90%'
    },

    deFlexButon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        margin: 20
    },
    buttonEliminar: {
        backgroundColor: '#FFF',
        padding: 5,
        borderRadius: 5,
        width: 100,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 60,
        left: '65%'
    },

    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16
    },
    buttonTextok: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16
    },
    noHay: {
        flexGrow: 1,
        textAlign: 'center',
        justifyContent: 'center',
        paddingTop: 200
    },
    image: {
        width: 50,
        height: 50,
        padding: 3,
        borderRadius: 100,
        borderRadius: 100,
        borderWidth: 1.3,
        borderColor: '#fff'
    },

    chat: {
        flexDirection: 'row',
        gap: 20,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    deFlex: {

        width: '75%'
    },
    deFlex2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',



    },
    deColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 5,
    },

    imageModalContainer: {
        backgroundColor: '#128C7E',

        height: '100%',
        flexDirection: 'column',

    },
    fullScreenImage: {
        height: 100,
        width: 100,
        borderRadius: 100,
        objectFit: 'cover',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginBottom: 15,
        marginTop: 50


    },
    closeButton: {

        height: 300,
        width: '100%',
    },
    modalOverlay: {


        width: '100%',
        height: '10%'
    },
    mensaje1o2: {
        flexDirection: 'row',
        gap: 0,
        width: '100%',
    },

    buttonContainer: {

        marginTop: 20,
        width: '100%',
        height: 150

    },
    buttonBtns: {
        backgroundColor: 'rgba(18, 140, 126, 0.2)',
        borderRadius: 20,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    activeButton: {
        backgroundColor: '#128C7E',
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontWeight: 'bold',
        paddingHorizontal: 15
    },
    activeButtonText: {
        color: '#fff',
        paddingHorizontal: 15
    },

    mensajVisto: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,

    },
    mensajeChat: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 15,

    },
    mensajNoVisto: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',


        gap: 20

    },
    mensajeNum: {
        backgroundColor: '#25D366',
        borderRadius: 100,
        padding: 3.4,
        width: 21,
        height: 21,
        textAlign: 'center',
        fontSize: 11,
        color: '#fff',
        position: 'absolute',
        top: 0,
        left: 240,

    },
    espacio: {
        height: 100
    },
    buttonCreate: {


    },
    iconPuntos: {
        fontSize: 21,
        fontWeight: 'bold',
        transform: [{ rotate: '90deg' }],
        color: '#fff',
    },
    imagePerfil: {
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#fff' // Cambia este valor al color que desees
    },
    atras: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    deFlexHeader: {
        flexDirection: 'row',

        gap: 10
    },
    deFlexHeader2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24
    },
    chatNombre: {
        color: '#fff',
        fontSize: 17
    },
    opciones: {

        marginTop: -90
    },
    textEstadoFecha: {
        color: '#fff',
        fontSize: 12
    },
    textEstadoName: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,

    },
    textEstadoDescrip: {
        color: '#fff',
        fontSize: 15,
        paddingTop: 20,
        paddingHorizontal: 20,
        textAlign: 'center'

    },
    contentEstadoDescrip: {
        position: 'absolute',
        top: '70%'
    },
    responder: {
        position: 'absolute',
        top: '92%',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',

    },
    responderText: {
        color: '#fff',
        fontSize: 13
    },
    progressBar: {

        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Fondo gris
        overflow: 'hidden',
        marginBottom: 10,
        height: 3,
    },
    progressBarFill: {
        height: 3,
        backgroundColor: '#fff', // Relleno blanco
    },
    noResult: {
        color: '#000',
        marginTop: 200,
        textAlign: 'center',
        marginBottom: 300
    },
    recientes: {
        color: 'rgba(0, 0, 0, 0.6)',
        padding: 15
    },
    deFlexLlamada: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    cifradoText: {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    deFlexCifrado: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    TextLLamando: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center'
    },
    footerLlamada: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        height: 100,
        padding: 20,
        position: 'absolute',
        width: '100%',
        top: '87%'

    },
    iconLlamada: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 100
    }

})