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
import * as ImagePicker from 'expo-image-picker';
import NewMiPerfil from './NewMiPerfil'
export default function MiPerfil() {
    const isFocused = useIsFocused();
    const [chats, setChats] = useState([]);
    const navigation = useNavigation();
    const [imageModalSelectedImage, setImageModalSelectedImage] = useState('');

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editNumero, setEditNumero] = useState('');
    const [editChat, setEditChat] = useState('');
    const [editChatId, setEditChatId] = useState('');
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editChat1, setEditChat1] = useState('');
    const [editChat2, setEditChat2] = useState('');
    const [editImg, setEditImg] = useState('');
    const [editNum, setEditNum] = useState('');
    const [editEstate, setEditEstate] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [selectedImageUri, setSelectedImageUri] = useState('');

    const [showHomeComponent, setShowHomeComponent] = useState(true);
    const [showActividad, setShowActividad] = useState(false);
    const [showModalContainer, setShowModalContainer] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal = () => {
        setModalVisible2(!isModalVisible2);
    };
    useEffect(() => {
        fetchChats();
    }, [isFocused]);

    const fetchChats = async () => {
        try {
            const savedChats = await AsyncStorage.getItem('miperfil');
            if (savedChats) {
                const parsedChats = JSON.parse(savedChats);
                const orderedChats = parsedChats.reverse();
                setChats(orderedChats);
            }
        } catch (error) {
            console.log('Error fetching chats:', error);
        }
    };


    const openEditModal = (id, numero, chat, chat1, chat2, num, estate, imagen) => {
        setEditModalVisible(true);
        setEditNumero(numero);
        setEditChat(chat);
        setEditChat1(chat1);
        setEditChat2(chat2);
        setEditNum(num);
        setEditEstate(estate);
        setEditImg(imagen);
        setEditChatId(id);
        console.log("Image URL:", imagen);
        // Set the selected image for the edit modal
        setSelectedImage(imagen);
        setSelectedImageUri(imagen);
    };
    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                setSelectedImageUri(result.uri);
            }
        } catch (error) {
            console.log('Error selecting image:', error);
        }
    };

    const saveEdit = async () => {
        try {
            const savedChats = await AsyncStorage.getItem('miperfil');
            if (savedChats) {
                const parsedChats = JSON.parse(savedChats);
                const newChats = parsedChats.map((chat) => {
                    if (chat.id === editChatId) {
                        return {
                            ...chat,
                            numero: editNumero,
                            chat: editChat,
                            chat1: editChat1,
                            chat2: editChat2,
                            numChat: editNum,
                            estateChat: editEstate,
                            img: selectedImageUri // Actualiza la imagen aquí
                        };
                    }
                    return chat;
                });

                await AsyncStorage.setItem('miperfil', JSON.stringify(newChats));
                setChats(newChats);
                setEditModalVisible(false);
            }
        } catch (error) {
            console.log('Error saving edit:', error);
        }
    };



    const deleteChat = async () => {
        try {
            const savedChats = await AsyncStorage.getItem('miperfil');
            if (savedChats) {
                const parsedChats = JSON.parse(savedChats);
                const newChats = parsedChats.filter(
                    (chat) => chat.id !== editChatId
                );
                await AsyncStorage.setItem('miperfil', JSON.stringify(newChats));
                setChats(newChats);
                setEditModalVisible(false);
                setDeleteModalVisible(false);
            }
        } catch (error) {
            console.log('Error deleting chat:', error);
        }
    };



    if (chats.length === 0) {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={toggleModal} style={styles.crearPerfilBtn}>
                    <Image
                        source={{ uri: `https://i.postimg.cc/7PGyJ45s/fotoUser.jpg` }} // Use a 
                        style={styles.imageNoPerfil}
                        resizeMode="contain"
                    />
                    <Text style={styles.textNoPerfil}>Presiona para crear tu perfil</Text>
                    <Ionicons name="qr-code" size={24} color="#25D366" />
                </TouchableOpacity>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible2}
                    onRequestClose={toggleModal}

                >
                    <View style={styles.modal}>
                        <LinearGradient
                            colors={['#128C7E', '#128C7E']}

                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={styles.headerAtras2}>
                                <TouchableOpacity onPress={toggleModal}>
                                    <View style={styles.deFlexHeader}>

                                        <AntDesign name="arrowleft" size={24} color="#fff" />




                                        <Text style={styles.perfilTitleText}> Crea tu perfil</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                        <NewMiPerfil />
                    </View>

                </Modal>


            </View>

        );
    }


    return (
        <View style={styles.chatsContainer}>
            <View style={styles.chatsContainer}>
                {chats.map((chat, index) => (
                    <View style={styles.chat}>



                        <TouchableOpacity
                            key={chat.id}
                            onPress={() => {

                                openEditModal(
                                    chat.id,
                                    chat.numero,
                                    chat.chat,
                                    chat.chat1,
                                    chat.chat2,
                                    chat.num,
                                    chat.estate,
                                    chat.img // Make sure this is correct
                                )

                            }
                            }
                            style={styles.deFlexPerfil}
                        >
                            <View style={styles.deFlexPerfilText}>
                                <Image
                                    source={{ uri: `${chat.img}` || 'https://i.postimg.cc/7PGyJ45s/fotoUser.jpg' }}
                                    style={styles.image}
                                />

                                <Text style={styles.deFlexPerfilTexto}>{chat.chat.slice(0, 30)}</Text>
                            </View>

                            <Ionicons name="qr-code" size={24} color="#25D366" />

                        </TouchableOpacity></View>
                ))}

            </View>
            <Modal
                visible={editModalVisible}
                animationType="slide"
                onRequestClose={() => setEditModalVisible(false)}
            >


                <LinearGradient
                    colors={['#128C7E', '#128C7E']}

                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={styles.headerAtras2}>
                        <View style={styles.deFlexHeader}>
                            <TouchableOpacity
                                style={styles.atras}
                                onPress={() => setEditModalVisible(false)}
                            >
                                <AntDesign name="arrowleft" size={24} color="#fff" />


                                <Text style={styles.perfilTitleText}> Perfil</Text>

                            </TouchableOpacity>

                        </View>





                    </View>



                </LinearGradient>


                <View style={styles.inputsEdit}>




                    <Image
                        source={{ uri: selectedImageUri || 'https://i.postimg.cc/7PGyJ45s/fotoUser.jpg' }}
                        style={styles.imagePerfil}
                        resizeMode="contain"
                    />
                    <TouchableOpacity onPress={selectImage} style={styles.selectImageButton}>
                        <FontAwesome name="camera" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.inputsFlex}>


                        <FontAwesome name="user" size={20} color="rgba(0, 0, 0, 0.3)"
                            style={styles.Icon2} />
                        <TextInput
                            value={editChat}
                            onChangeText={setEditChat}
                            placeholder="Chat"
                            style={styles.inputEdit}
                            multiline={true}

                        />
                        <MaterialIcons name="edit" size={20} color="rgba(0, 0, 0, 0.3)"
                            style={styles.Icon} />
                    </View>

                    <View style={styles.inputsFlex}>

                        <Entypo name="phone" size={20}
                            color="rgba(0, 0, 0, 0.3)"
                            style={styles.Icon} />
                        <TextInput
                            value={editNumero}
                            onChangeText={setEditNumero}
                            placeholder="Número"
                            style={styles.inputEdit}
                            multiline={true}

                        />
                        <MaterialIcons name="edit" size={20} color="rgba(0, 0, 0, 0.3)"
                            style={styles.Icon} />
                    </View>
                </View>

                <View style={styles.deFlexButon}>
                    <TouchableOpacity
                        style={styles.buttonGuardar}
                        onPress={() => saveEdit()}
                    >
                        <Text style={styles.buttonTextok}>Guardar</Text>
                    </TouchableOpacity>
                    <View style={styles.deFlex2}>
                        <TouchableOpacity
                            style={styles.buttonEliminar}
                            onPress={() => deleteChat()}
                        >
                            <Text style={styles.buttonTextok}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>



        </View >
    );
}

const styles = StyleSheet.create({
    chatsContainer: {
        paddingTop: 50,


    },

    chatText: {
        color: 'rgba(0, 0, 0, 0.9)',
        fontSize: 16
    },

    dateText: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 13
    },
    headerAtras2: {
        flexDirection: 'row',
        paddingTop: 10,
        padding: 10,
        justifyContent: 'space-between',
    },

    inputsEdit: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputsFlex: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: 'rgba(255, 254, 256, 0.1)',
        borderRadius: 30,
        padding: 20,
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

    Icon: {
        paddingTop: 4
    },
    Icon2: {
        paddingTop: 4
    },
    deFlexButon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        margin: 20
    },
    buttonEliminar: {
        backgroundColor: '#CB6CE6',
        padding: 10,
        borderRadius: 20,
        width: 150,
        textAlign: 'center',
        justifyContent: 'center',
    },
    buttonGuardar: {
        backgroundColor: '#128C7E',
        padding: 10,
        borderRadius: 20,
        width: 150,
        textAlign: 'center',
        justifyContent: 'center',
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
        width: 60,
        height: 60,
        borderRadius: 100
    },
    chat: {
        flexDirection: 'row',
        gap: 13,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    fullScreenImage: {
        height: 220,
        width: 300,

        objectFit: 'contain'
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

    buttonCreate: {


    },
    iconPuntos: {
        fontSize: 21,
        fontWeight: 'bold',
        transform: [{ rotate: '90deg' }],
        color: '#fff',
    },
    iconPuntos2: {
        fontSize: 21,
        fontWeight: 'bold',
        transform: [{ rotate: '90deg' }],
        color: 'rgba(0, 0, 0, 0.6)',
    },
    imagePerfil: {
        width: 150,
        height: 150,
        borderRadius: 100,
        objectFit: 'cover',

        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    atras: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
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
    iconsFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        gap: 40
    },
    flexImg: {
        flexDirection: 'column',

        width: 293,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    modalContainer2: {
        backgroundColor: '#EEF3F4',
        gap: 2


    },
    headerPerfil: {
        padding: 10,
        backgroundColor: '#fff',

    },
    perfilChat: {

        height: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 7,

    },
    imageChatPerfil: {
        height: 120,
        width: 120,
        borderRadius: 100
    },
    numeroChatPerfil: {
        fontSize: 19,
        color: 'rgba(0, 0, 0, 0.6)',
    },
    nombreChatPerfil: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.9)',
    },
    perfilTitleText: {
        color: '#fff',
        fontSize: 19,
    },
    deFlexPerfilText: {
        flexDirection: 'row',
        gap: 15,

        alignItems: 'center',

    },
    deFlexPerfil: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderColor: '#000',
        borderBottomWidth: 0.2,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        paddingVertical: 20

    },
    deFlexPerfilTexto: {
        fontSize: 16,
    },
    selectImageButton: {
        backgroundColor: '#25D366',
        padding: 10,
        borderRadius: 100,
        position: 'absolute',
        right: '35%',
        top: 130
    },
    container: {
        marginTop: 130,
        padding: 20

    },
    modal: {
        height: '100%',
        backgroundColor: '#fff'
    },
    crearPerfilBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    imageNoPerfil: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    textNoPerfil: {
        fontSize: 16

    }
})