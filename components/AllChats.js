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
import SeguridadChat from './SeguridadChat';
import SituacionChat from './SituacionChat';
import IconosChat from './IconosChat';
import BloquearRepor from './BloquearRepor';
import Notificaciones from './Notificaciones';
import Multimedia from './Multimedia';
export default function AllChats() {
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

    const [showHomeComponent, setShowHomeComponent] = useState(true);
    const [showActividad, setShowActividad] = useState(false);
    const [showModalContainer, setShowModalContainer] = useState(false);

    useEffect(() => {
        fetchChats();
    }, [isFocused]);

    const fetchChats = async () => {
        try {
            const savedChats = await AsyncStorage.getItem('chats');
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

    };

    const saveEdit = async () => {
        try {
            const savedChats = await AsyncStorage.getItem('chats');
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
                            // img: editImg
                        };
                    }
                    return chat;
                });

                await AsyncStorage.setItem('chats', JSON.stringify(newChats));
                setChats(newChats);
                setEditModalVisible(false);
            }
        } catch (error) {
            console.log('Error saving edit:', error);
        }
    };


    const deleteChat = async () => {
        try {
            const savedChats = await AsyncStorage.getItem('chats');
            if (savedChats) {
                const parsedChats = JSON.parse(savedChats);
                const newChats = parsedChats.filter(
                    (chat) => chat.id !== editChatId
                );
                await AsyncStorage.setItem('chats', JSON.stringify(newChats));
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
            <Text style={styles.noChats}>No hay chats</Text>
        );
    }


    const showHome = () => {
        setShowHomeComponent(true);
        setShowActividad(false);
    };

    const showActividadComponent = () => {
        setShowHomeComponent(false);
        setShowActividad(true);
    };
    const openModal = () => {
        setModalVisible(true);
    };
    return (
        <View style={styles.chatsContainer}>
            <View style={styles.chatsContainer}>
                {chats.map((chat, index) => (
                    <View style={styles.chat}>
                        <TouchableOpacity onPress={() => {
                            setSelectedImage(chat.img);
                            setImageModalVisible(true);
                        }}>
                            <Image
                                source={{ uri: `${chat.img}` || 'https://i.postimg.cc/7PGyJ45s/fotoUser.jpg' }}
                                style={styles.image}
                            />
                        </TouchableOpacity>


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
                        >

                            <View style={styles.deFlex2}>



                                <View style={styles.deFlex}>

                                    <View style={styles.deColumn}>
                                        {chat.chat.length > 36 ? (
                                            <Text style={styles.chatText}>{chat.chat.slice(0, 10)}..</Text>
                                        ) : (
                                            <Text style={styles.chatText}>{chat.chat}</Text>
                                        )}

                                        <View style={styles.mensaje1o2}>
                                            <View style={styles.mensajVisto}>
                                                {chat.estateChat === "visto" ? (
                                                    <Ionicons name="md-checkmark-done-sharp" size={15} color="#00BFFF" />
                                                ) : chat.estateChat === "noVisto" ? (
                                                    <Ionicons name="md-checkmark-done-sharp" size={15} color="grey" />
                                                ) : null}
                                                {chat.chat1 && chat.chat1 !== "" && <Text style={styles.mensajeChat}>{chat.chat1.slice(0, 10)}</Text>}
                                            </View>

                                            <View style={styles.mensajNoVisto}>
                                                {chat.chat2 && chat.chat2 !== "" && <Text style={styles.mensajeChat}>{chat.chat2.slice(0, 10)}</Text>}

                                                {chat.numChat && chat.numChat !== "" && <Text style={styles.mensajeNum}>{chat.numChat.slice(0, 10)}</Text>}

                                            </View>

                                        </View>




                                    </View>
                                </View>

                                <Text style={styles.dateText}>
                                    {new Date(chat.createdAt).toLocaleDateString() === new Date().toLocaleDateString()
                                        ? new Date(chat.createdAt).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })
                                        : new Date(chat.createdAt).toLocaleDateString()
                                    }
                                </Text>





                            </View>
                        </TouchableOpacity></View>
                ))}
            </View>
            <Modal
                visible={editModalVisible}
                animationType="slide"
                onRequestClose={() => setEditModalVisible(false)}
            >
                <ScrollView style={styles.modalContainer}>

                    <LinearGradient
                        colors={['#128C7E', '#128C7E']}
                        style={styles.container}
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

                                    <Image
                                        source={{ uri: selectedImage || `https://i.postimg.cc/7PGyJ45s/fotoUser.jpg` }} // Use a 
                                        style={styles.imagePerfil}
                                        resizeMode="contain"
                                    />



                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttonCreate}
                                    onPress={() => openModal()}>
                                    <Text style={styles.chatNombre}>{editChat}</Text>
                                </TouchableOpacity>
                            </View>




                            <View style={styles.deFlexHeader2}>
                                <FontAwesome name="video-camera" size={20} color="#FFF" />
                                <MaterialIcons name="phone" size={22} color="#FFF" />
                                <TouchableOpacity
                                    style={styles.buttonCreate}
                                    onPress={() => setShowModalContainer(!showModalContainer)}
                                >
                                    <Text style={styles.iconPuntos}>...</Text>

                                </TouchableOpacity>
                            </View>

                        </View>



                    </LinearGradient>






                    {showModalContainer && (
                        < >

                            <View style={styles.inputsEdit}>

                                <View style={styles.inputsFlex}>
                                    <MaterialIcons
                                        name="description"
                                        size={20}
                                        color="rgba(0, 0, 0, 0.3)"
                                        style={styles.Icon}
                                    />
                                    <TextInput
                                        value={editNumero}
                                        onChangeText={setEditNumero}
                                        placeholder="Número"
                                        style={styles.inputEdit}
                                        multiline={true}

                                    />
                                </View>


                                <View style={styles.inputsFlex}>
                                    <MaterialIcons
                                        name="description"
                                        size={20}
                                        color="rgba(0, 0, 0, 0.3)"
                                        style={styles.Icon2}
                                    />
                                    <TextInput
                                        value={editChat}
                                        onChangeText={setEditChat}
                                        placeholder="Chat"
                                        style={styles.inputEdit}
                                        multiline={true}

                                    />
                                </View>

                                <View style={styles.buttonContainer}>
                                    <View style={styles.buttonBtns}>
                                        <TouchableOpacity
                                            style={[styles.button, showHomeComponent && styles.activeButton]}
                                            onPress={showHome}
                                        >
                                            <Text style={[styles.buttonText, showHomeComponent && styles.activeButtonText]}>Msje enviado</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.button, showActividad && styles.activeButton]}
                                            onPress={showActividadComponent}
                                        >
                                            <Text style={[styles.buttonText, showActividad && styles.activeButtonText]}>Msje recibido</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {showHomeComponent && <View style={styles.opciones}>
                                    <View style={styles.inputsFlex}>
                                        <MaterialIcons
                                            name="chat"
                                            size={20}
                                            color="rgba(0, 0, 0, 0.3)"
                                            style={styles.Icon}
                                        />

                                        <TextInput
                                            value={editChat1}
                                            onChangeText={setEditChat1}
                                            placeholder="Mensaje enviado"
                                            style={styles.inputEdit}
                                            multiline={true}

                                        />
                                    </View>


                                    <View style={styles.inputsFlex2}>
                                        <Ionicons
                                            name="md-checkmark-done-sharp"
                                            size={20}
                                            color="rgba(0, 0, 0, 0.3)"
                                            style={styles.Icon2}
                                        />

                                        <Picker
                                            selectedValue={editEstate}
                                            onValueChange={setEditEstate}
                                            style={styles.inputEdit}
                                        >
                                            <Picker.Item label="Mensaje visto / no visto" value="" />
                                            <Picker.Item label="Visto" value="visto" />
                                            <Picker.Item label="No visto" value="noVisto" />
                                        </Picker>
                                    </View>
                                </View>
                                }


                                {showActividad && <View style={styles.opciones}>


                                    <View style={styles.inputsFlex}>
                                        <MaterialIcons
                                            name="chat"
                                            size={20}
                                            color="rgba(0, 0, 0, 0.3)"
                                            style={styles.Icon2}
                                        />
                                        <TextInput
                                            value={editChat2}
                                            onChangeText={setEditChat2}
                                            placeholder="Mensaje recibido"
                                            style={styles.inputEdit}
                                            multiline={true}

                                        />
                                    </View>

                                    <View style={styles.inputsFlex}>
                                        <Octicons
                                            name="number"
                                            size={20}
                                            color="rgba(0, 0, 0, 0.3)"
                                            style={styles.Icon2}
                                        />
                                        <TextInput
                                            value={editNum}
                                            onChangeText={setEditNum}
                                            placeholder="Numero de mensajes"
                                            style={styles.inputEdit}
                                            multiline={true}
                                            keyboardType='numeric'

                                        />
                                    </View>
                                </View>}



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
                        </>
                    )}




                </ScrollView>
            </Modal>
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >

                <ScrollView style={styles.modalContainer2}>
                    <View style={styles.headerPerfil}>
                        <View style={styles.deFlex2}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} >
                                <AntDesign name="arrowleft" size={24} color="#000" />
                            </TouchableOpacity>

                            <Text style={styles.iconPuntos2}>...</Text>
                        </View>


                        <View style={styles.perfilChat}>
                            <Image
                                source={{ uri: selectedImage || `https://i.postimg.cc/7PGyJ45s/fotoUser.jpg` }} // Use a 
                                style={styles.imageChatPerfil}
                                resizeMode="contain"
                            />
                            <Text style={styles.nombreChatPerfil}>{editChat}</Text>
                            <Text style={styles.numeroChatPerfil}>{editNumero}</Text>
                        </View>
                        <IconosChat />
                    </View>

                    <SituacionChat />

                    <SeguridadChat />
                    <Multimedia />
                    <Notificaciones />
                    <BloquearRepor />
                </ScrollView>

            </Modal>
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
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        onPress={() => setImageModalVisible(false)}
                    />
                    <View style={styles.flexImg}>
                        <Image
                            source={{ uri: selectedImage || 'https://i.postimg.cc/7PGyJ45s/fotoUser.jpg' }}
                            style={styles.fullScreenImage}
                            resizeMode="contain"
                        />

                        <View style={styles.iconsFlex}>
                            <FontAwesome name="video-camera" size={20} color="#25D366" />
                            <MaterialIcons name="phone" size={22} color="#25D366" />
                            <MaterialIcons
                                name="chat"
                                size={20}
                                color="#25D366"
                            />
                            <Feather name="help-circle" size={24} color="#25D366" />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setImageModalVisible(false)}
                    >

                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.espacio}>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    chatsContainer: {
        paddingTop: 15,





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
        width: 50,
        height: 50,
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
    iconPuntos2: {
        fontSize: 21,
        fontWeight: 'bold',
        transform: [{ rotate: '90deg' }],
        color: 'rgba(0, 0, 0, 0.6)',
    },
    imagePerfil: {
        width: 35,
        height: 35,
        borderRadius: 100
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
    }
})