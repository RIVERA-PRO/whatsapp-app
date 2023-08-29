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
export default function PhotoPerfil() {
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


            <View style={styles.deFlexPerfil}>
                <Image
                    source={{ uri: `https://i.postimg.cc/7PGyJ45s/fotoUser.jpg` }} // Use a 
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={styles.plus}>
                    <AntDesign name="plus" size={20} color="#fff" />
                </View>

            </View>







        );
    }


    return (

        <>
            {chats.map((chat, index) => (




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

                    <Image
                        source={{ uri: `${chat.img}` || 'https://i.postimg.cc/7PGyJ45s/fotoUser.jpg' }}
                        style={styles.image}
                    />

                    <View style={styles.plus}>
                        <AntDesign name="plus" size={20} color="#fff" />
                    </View>


                </TouchableOpacity>
            ))}
        </>


    );
}

const styles = StyleSheet.create({

    crearPerfilBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    textNoPerfil: {
        fontSize: 16

    },
    plus: {
        backgroundColor: '#25D366',
        borderRadius: 100,
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 30,
        right: '0%',
        borderColor: '#fff',
        borderWidth: 2

    }
})