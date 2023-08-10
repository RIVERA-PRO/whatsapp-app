import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import image from '../assets/Cloud.png'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';

export default function Header() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const navigation = useNavigation();

    const goToHome = () => {
        navigation.navigate('Home');
        setModalVisible(!isModalVisible);
    };



    const goToNewChat = () => {
        navigation.navigate('NewChatScreen');
        setModalVisible(!isModalVisible);
    };


    const openLinkedInProfile = () => {
        const linkedInURL = 'https://www.linkedin.com/in/juan-rivera-9ba866215/'; // Reemplaza con tu URL de LinkedIn
        Linking.openURL(linkedInURL);
    };

    const openWebsite = () => {
        const websiteURL = 'https://www.juan-rivera-developer.com/'; // Reemplaza con tu URL del sitio web
        Linking.openURL(websiteURL);
    };

    const openWhatsAppChat = () => {
        const phoneNumber = '1234567890'; // Reemplaza con tu número de teléfono
        const whatsappURL = `https://wa.me/qr/AHQDYWM7EKATH1`;
        Linking.openURL(whatsappURL);
    };
    return (

        <View style={styles.container}>

            <View style={styles.headerContain}>
                <TouchableOpacity onPress={toggleModal}>
                    <Text style={styles.logoText}>WhatsApp</Text>
                </TouchableOpacity>
                <View style={styles.deFlex}>
                    <Feather name="camera" size={24} color="#fff" />
                    <Ionicons name="search-outline" size={24} color="#fff" />

                    <Text style={styles.iconPuntos}>...</Text>

                </View>

            </View>




            <Modal
                isVisible={isModalVisible}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                swipeDirection="left"
                onSwipeComplete={toggleModal}
                onBackdropPress={toggleModal}
                style={styles.modal}
            >


                <View style={styles.modalContent} >

                    <Image source={image} style={styles.img} />
                    <Text style={styles.dateText}>{getCurrentDate()}</Text>
                    <View style={styles.navBtns}>
                        <TouchableOpacity onPress={goToHome} style={styles.btnNav}>
                            <FontAwesome name="home" size={20} color='#128C7E' />
                            <Text style={styles.buttonText}>Inicio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goToNewChat} style={styles.btnNav}>
                            <MaterialCommunityIcons name="chat" size={20} color='#128C7E' />
                            <Text style={styles.buttonText}>Nuevo Chat</Text>
                        </TouchableOpacity>


                        <Text style={styles.text}>Contacto del desarrollador</Text>
                        <View style={styles.social}>
                            <TouchableOpacity onPress={openLinkedInProfile} style={styles.btnNav}>
                                <FontAwesome name="linkedin" size={20} color="#128C7E" />

                            </TouchableOpacity>
                            <TouchableOpacity onPress={openWebsite} style={styles.btnNav}>
                                <FontAwesome name="globe" size={20} color="#128C7E" />

                            </TouchableOpacity>
                            <TouchableOpacity onPress={openWhatsAppChat} style={styles.btnNav}>
                                <FontAwesome name="whatsapp" size={20} color="#128C7E" />

                            </TouchableOpacity>
                        </View>
                    </View>


                </View>

            </Modal>
        </View>

    );
}

const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        flexDirection: 'column',
        padding: 10,

    },

    headerContain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    deFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    logo: {
        width: 25,
        height: 25,
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,

    },
    logoText: {
        color: '#fff',
        fontSize: 21,

    },
    dateText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 13,
        marginLeft: 30
    },

    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        elevation: 5,

    },
    buttonText: {
        color: 'rgba(0, 0, 0, 0.8)',
        fontWeight: 'bold',

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        width: '80%',
        height: '100%',

    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    img: {
        width: '100%',
        height: 140,
        objectFit: 'cover'
    },
    navBtns: {
        marginTop: 30
    },

    btnNav: {
        flexDirection: 'row',
        gap: 10,
        borderRadius: 8,
        padding: 10,
        margin: 9,
        borderBottomWidth: 0.3,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    social: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',

    },
    text: {
        textAlign: 'center',
        marginTop: 100
    },
    modal: {
        margin: 0
    },
    iconPuntos: {
        fontSize: 21,
        fontWeight: 'bold',
        transform: [{ rotate: '90deg' }],
        color: '#fff',
    },


});
