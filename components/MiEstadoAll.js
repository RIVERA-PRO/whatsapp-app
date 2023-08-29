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
import PhotoPerfil from './PhotoPerfil';
import PhotoEstadoPerfil from './PhotoEstadoPerfil';
export default function MiEstadoAll() {
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
    const [viewModalVisible, setViewModalVisible] = useState(false);

    const openViewsModal = () => {
        clearInterval(intervalId); // Pause the countdown timer
        setViewModalVisible(true);
    };

    const closeViewsModal = () => {
        setViewModalVisible(false);

    };

    const [countdown, setCountdown] = useState(5);
    let intervalId;



    useEffect(() => {
        let intervalId;

        if (imageModalVisible) {
            const intervalDuration = 1000; // Intervalo de 1 segundo
            const maxProgress = 5; // 5 segundos en total
            let currentProgress = 0;

            intervalId = setInterval(() => {
                currentProgress += 0.6;
                setProgress(currentProgress);

                if (currentProgress >= maxProgress) {
                    clearInterval(intervalId);
                    setImageModalVisible(false);
                    setShowStatusBar(true);
                    setViewModalVisible(false);
                }


            }, intervalDuration);
        }

        return () => clearInterval(intervalId);
    }, [imageModalVisible]);

    const fetchEstados = async () => {
        try {
            const savedEstados = await AsyncStorage.getItem('miestado');
            if (savedEstados) {
                const parsedEstados = JSON.parse(savedEstados);
                const orderedEstados = parsedEstados.reverse().map(estado => ({
                    ...estado,
                    id: estado.id,
                    isSelected: false,
                    img2: estado.img2,
                    img: estado.img,

                }));
                setEstados(orderedEstados);
            }
        } catch (error) {
            console.log('Error fetching estados:', error);
        }
    };


    const goToNewMiEstado = () => {
        navigation.navigate('NewMiEstado');

    };

    const removeSelectedEstado = async () => {
        if (selectedEstadoId) {
            try {
                // Remove the selected estado from AsyncStorage
                const updatedEstados = estados.filter(estado => estado.id !== selectedEstadoId);
                await AsyncStorage.setItem('miestado', JSON.stringify(updatedEstados));

                // Update the state to reflect the changes
                setEstados(updatedEstados);
                setSelectedEstadoId(null); // Reset the selected estado ID
                setImageModalVisible(false); // Close the modal
            } catch (error) {
                console.log('Error removing estado:', error);
            }
        }
    };
    if (estados.length === 0) {
        return (
            <TouchableOpacity onPress={goToNewMiEstado} style={styles.btnNewEstado}>
                <PhotoPerfil />

                <View style={styles.noResultColumnText}>
                    <Text style={styles.estadoText}>Mi Estado</Text>
                    <Text style={styles.dateText}>Añade una actualización</Text>
                </View>
            </TouchableOpacity>
        );
    }



    return (
        <View style={styles.estadosContainer}>


            <View >
                {estados.map((estado, index) => (
                    <TouchableOpacity style={styles.estado} key={estado.id}
                        onPress={() => {
                            setSelectedImage(estado.img);
                            setSelectedEstadoId(estado.id);
                            setImageModalVisible(true);
                        }} >

                        <View style={styles.bordeColoriMG}>
                            <Image
                                source={{ uri: `${estado.img}` }}
                                style={styles.image}
                            />
                        </View>

                        <View style={styles.deFlex2}>
                            <View style={styles.deFlex}>
                                <View style={styles.deColumn}>
                                    <Text style={styles.estadoText}>{estado.estadoName.slice(0, 17)}</Text>
                                    <Text style={styles.dateText}>{estado.fecha.slice(0, 9)}</Text>
                                </View>
                            </View>
                            <View style={styles.deFlex}>
                                <Text style={styles.dateText}>

                                </Text>
                            </View>

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
                    {showStatusBar && <StatusBar barStyle="dark-content" />}
                    {imageModalVisible && (
                        <View style={styles.progressBar}>
                            <View style={[styles.progressBarFill, { width: `${(progress / 5) * 100}%` }]} />
                        </View>
                    )}
                    <View style={styles.headerAtras2}>
                        <View style={styles.deFlesxHeader}>
                            <TouchableOpacity
                                style={styles.modalOverlay}
                                onPress={() => setImageModalVisible(false)}
                            />

                            <TouchableOpacity
                                style={styles.atras}
                                onPress={() => setImageModalVisible(false)}
                            >
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                                <PhotoEstadoPerfil />
                                <View>
                                    <Text style={styles.textEstadoName}>{estados.find(estado => estado.id === selectedEstadoId)?.estadoName.slice(0, 17)}</Text>
                                    <Text style={styles.textEstadoFecha}>{estados.find(estado => estado.id === selectedEstadoId)?.fecha.slice(0, 9)}</Text>
                                </View>
                            </TouchableOpacity>

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
                    <ScrollView style={styles.contentEstadoDescrip}>
                        <Text style={styles.textEstadoDescrip}>{estados.find(estado => estado.id === selectedEstadoId)?.estadoDescrip.slice(0, 250)}</Text>

                    </ScrollView>
                    <TouchableOpacity style={styles.responder} onPress={openViewsModal}>
                        <Ionicons name="eye-outline" size={20} color="#fff" />
                        <Text style={styles.responderText}>Vistas</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
            <Modal
                visible={viewModalVisible}
                transparent={true}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                swipeDirection="left"
                onSwipeComplete={viewModalVisible}


                animationType="fade"
            >

                <View style={styles.viewModalContainer} >

                    <TouchableOpacity style={styles.headerModal} onPress={closeViewsModal}>
                        <Text style={styles.viewModalCloseButtonText}>Visto por </Text>
                        <View style={styles.deFlexVistas}>
                            <MaterialIcons name="delete" size={24} color="#fff" />
                            <MaterialCommunityIcons name="share" size={24} color="#fff" />
                        </View>
                    </TouchableOpacity>

                    <ScrollView style={styles.viewContainer}>

                        <Text style={styles.viewModalTitle}>Vistas</Text>


                    </ScrollView>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    estadosContainer: {
        paddingTop: 6,
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
        paddingHorizontal: 15,
        marginTop: 25
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
        marginTop: -55
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
    bordeColoriMG: {
        backgroundColor: '#25D366',
        borderRadius: 100,
        width: 54,
        height: 54,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chat: {
        flexDirection: 'row',
        gap: 20,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    deFlex: {

        width: '60%'
    },
    deFlex2: {
        flexDirection: 'row',
        justifyContent: 'space-between',



    },
    deColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10
    },

    imageModalContainer: {
        backgroundColor: '#000',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    fullScreenImage: {
        height: 300,
        width: '100%',
        marginTop: 70

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
        fontSize: 17,

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
        flexDirection: 'row',
        alignItems: 'center',
        color: '#fff',
        gap: 10

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
        marginTop: 300,
        textAlign: 'center'
    },
    recientes: {
        color: 'rgba(0, 0, 0, 0.6)',
        padding: 15
    },
    btnNewEstado: {
        flexDirection: 'row',
        gap: 13,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 25,
        alignItems: 'center'
    },
    viewModalContainer: {
        height: 500,
        backgroundColor: '#fff',
        flexDirection: 'row',

        flexDirection: 'column',
        top: '40%',
        marginHorizontal: 10,
        borderRadius: 7,
        overflow: 'hidden',

    },
    headerModal: {
        backgroundColor: '#25D366',

        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    deFlexVistas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20
    },
    viewModalCloseButtonText: {
        color: '#fff',
        fontSize: 17
    },
    viewContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    }

})