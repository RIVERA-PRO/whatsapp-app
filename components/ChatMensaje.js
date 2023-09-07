import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, Modal, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ChatMensaje() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const scrollViewRef = useRef();

    useEffect(() => {
        loadMessages();
        loadBackgroundImage();
    }, []);

    const loadMessages = async () => {
        try {
            const storedMessages = await AsyncStorage.getItem('chatMessages');
            if (storedMessages) {
                const parsedMessages = JSON.parse(storedMessages);
                setMessages(parsedMessages);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const saveMessages = async (newMessages) => {
        try {
            await AsyncStorage.setItem('chatMessages', JSON.stringify(newMessages));
            console.log('Messages saved successfully');
        } catch (error) {
            console.error('Error saving messages:', error);
        }
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            const newMessage = {
                text: inputMessage,
                sender: 'user',
                image: null,
                timestamp: new Date().toISOString(),
            };
            const newMessages = [...messages, newMessage];
            setMessages(newMessages);
            setInputMessage('');
            saveMessages(newMessages);
        }
    };

    const handleReceivedMessage = () => {
        if (receivedMessage.trim() !== '') {
            const newMessage = {
                text: receivedMessage,
                sender: 'other',
                image: null,
                timestamp: new Date().toISOString(),
            };
            const newMessages = [...messages, newMessage];
            setMessages(newMessages);
            setReceivedMessage('');
            saveMessages(newMessages);
        }
    };


    const handleClearAllMessages = async () => {
        try {
            // Clear messages from state
            setMessages([]);
            setSelectedImage('')
            // Clear messages from storage
            await AsyncStorage.removeItem('chatMessages');
            await AsyncStorage.removeItem('selectedImage');
            // Reload the component to reflect changes
            loadMessages();
            loadBackgroundImage()
        } catch (error) {
            console.error('Error clearing messages:', error);
        }
    };

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            const newMessage = { text: '', sender: 'user', image: result.uri };
            const newMessages = [...messages, newMessage];
            setMessages(newMessages);
            saveMessages(newMessages);
        }
    };

    const handleReceivedImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            const newMessage = { text: '', sender: 'other', image: result.uri };
            const newMessages = [...messages, newMessage];
            setMessages(newMessages);
            saveMessages(newMessages);
        }
    };

    const handleImagePick2 = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            const newMessage = { text: '', sender: 'user', image: '', image2: result.uri };
            const newMessages = [...messages, newMessage];
            setMessages(newMessages);
            saveMessages(newMessages);
        }
    };

    const handleReceivedImage2 = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            const newMessage = { text: '', sender: 'other', image: '', image2: result.uri };
            const newMessages = [...messages, newMessage];
            setMessages(newMessages);
            saveMessages(newMessages);
        }
    };
    const mostrarInputs = () => {
        setShowInput(!showInput)
    }
    const handleBackgroundImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result.uri);
            // Save the selected image URI to AsyncStorage or any other storage mechanism
            try {
                await AsyncStorage.setItem('selectedImage', result.uri);
                console.log('Background image saved successfully');
            } catch (error) {
                console.error('Error saving background image:', error);
            }
        }
    };
    const loadBackgroundImage = async () => {
        try {
            const backgroundImage = await AsyncStorage.getItem('selectedImage');
            if (backgroundImage) {
                setSelectedImage(backgroundImage);
            }
        } catch (error) {
            console.error('Error loading background image:', error);
        }
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [modalImageUri, setModalImageUri] = useState('');

    const openImageModal = (imageUri) => {
        setModalImageUri(imageUri);
        setModalVisible(true);
    };

    const closeImageModal = () => {
        setModalVisible(false);
        setModalImageUri('');
    };

    return (



        <View style={styles.container}>

            <View style={styles.inputContainer}>

                <View style={styles.inpuFflex}>
                    <TouchableOpacity onPress={handleBackgroundImagePick} style={styles.backgroundButton}>
                        <Entypo name="emoji-happy" size={20} color='rgba(0, 0, 0, 0.3)' />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Mensaje "
                        value={inputMessage}
                        onChangeText={setInputMessage}
                    />
                    <TouchableOpacity onPress={handleImagePick2} >
                        <EvilIcons name="paperclip" size={24} color='rgba(0, 0, 0, 0.4)' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleImagePick} >
                        <FontAwesome name="camera" size={20} color='rgba(0, 0, 0, 0.4)' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={mostrarInputs} >
                        <AntDesign name="pluscircleo" size={20} color='rgba(0, 0, 0, 0.3)' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleClearAllMessages} >
                        <MaterialIcons name="delete-outline" size={24} color='rgba(0, 0, 0, 0.3)' />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleSendMessage} style={styles.send}>
                    <Ionicons name="send" size={20} color="black" />
                </TouchableOpacity>

            </View>


            {showInput && (
                <View style={styles.inputContainer}>

                    <View style={styles.inpuFflex}>
                        <TouchableOpacity onPress={handleBackgroundImagePick} style={styles.backgroundButton}>
                            <Entypo name="emoji-happy" size={20} color='rgba(0, 0, 0, 0.3)' />
                        </TouchableOpacity>



                        <TextInput
                            style={styles.input}
                            placeholder="Mensaje recibido"
                            value={receivedMessage}
                            onChangeText={setReceivedMessage}
                        />
                        <TouchableOpacity onPress={handleReceivedImage2} >
                            <EvilIcons name="paperclip" size={24} color='rgba(0, 0, 0, 0.4)' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleReceivedImage} >
                            <FontAwesome name="camera" size={20} color='rgba(0, 0, 0, 0.4)' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={mostrarInputs} >
                            <AntDesign name="pluscircleo" size={20} color='rgba(0, 0, 0, 0.3)' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClearAllMessages} >
                            <MaterialIcons name="delete-outline" size={24} color='rgba(0, 0, 0, 0.3)' />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleReceivedMessage} style={styles.send}>
                        <Ionicons name="send" size={20} color="black" />
                    </TouchableOpacity>

                </View>
            )}

            <ScrollView
                style={styles.messageContainer}
                ref={scrollViewRef}
                onContentSizeChange={() => {
                    if (messages.length > 10) {
                        scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                }}
            >



                <ImageBackground source={{ uri: selectedImage }} style={styles.backgroundImage}>
                    {messages.map((message, index) => (
                        <View
                            key={index}
                            style={
                                message.sender === 'user'
                                    ? [styles.userMessage, { marginLeft: 20 }]
                                    : [styles.otherMessage, { marginRight: 20 }]
                            }
                        >
                            {message.image ? (
                                <TouchableOpacity onPress={() => openImageModal(message.image)}>
                                    <Image source={{ uri: message.image }} style={styles.image} />
                                </TouchableOpacity>
                            ) : null}

                            {message.image2 ? (
                                <TouchableOpacity onPress={() => openImageModal(message.image2)} style={styles.deFlex2}>
                                    <MaterialCommunityIcons name="progress-alert" size={20} color="rgba(0, 0, 0, 0.6)" />
                                    <Text style={message.sender === 'user' ? styles.sentimage2 : styles.receivedimage2}>
                                        Foto
                                    </Text>
                                </TouchableOpacity>
                            ) : null}
                            {message.text !== '' && (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={message.sender === 'user' ? styles.sentText : styles.receivedText}>
                                        {message.text}
                                    </Text>

                                </View>
                            )}

                            {message.text !== '' && (
                                <View style={styles.deFlex}>
                                    <TextInput
                                        style={[
                                            styles.timestampInput,
                                            message.sender === 'user' ? styles.sentTimestamp : styles.receivedTimestamp
                                        ]}
                                        value={
                                            message.editableTimestamp ||
                                            new Date(message.timestamp).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })
                                        }
                                        onChangeText={(newTime) => {
                                            const updatedMessages = [...messages];
                                            updatedMessages[index].editableTimestamp = newTime;
                                            setMessages(updatedMessages);
                                        }}
                                        onBlur={() => {
                                            if (message.editableTimestamp) {
                                                const updatedMessages = [...messages];
                                                const newTimestamp = new Date(message.editableTimestamp);

                                                if (!isNaN(newTimestamp)) {
                                                    updatedMessages[index].timestamp = newTimestamp.toISOString();
                                                    delete updatedMessages[index].editableTimestamp;
                                                    setMessages(updatedMessages);
                                                    saveMessages();
                                                }
                                            }
                                        }}
                                    />
                                    {message.sender === 'user' && (
                                        <Ionicons style={styles.icon} name="md-checkmark-done-sharp" size={15} color="grey" />
                                    )}
                                </View>

                            )}



                        </View>
                    ))}

                    <Modal visible={modalVisible} transparent={true} onRequestClose={closeImageModal}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={styles.modalCloseButton} onPress={closeImageModal}>
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                                <View style={styles.deFlex3}>
                                    <Entypo name="star-outlined" size={22} color="#fff" />
                                    <Fontisto name="share-a" size={18} color="#fff" />
                                    <Text style={styles.iconPuntos}>...</Text>
                                </View>
                            </TouchableOpacity>
                            <Image source={{ uri: modalImageUri }} style={styles.modalImage} resizeMode="contain" />
                        </View>
                    </Modal>
                    <View style={styles.estpacio}></View>
                </ImageBackground>
            </ScrollView>

        </View >

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#f0f0f0',


    },
    messageContainer: {
        flex: 1,


    },
    userMessage: {
        alignSelf: 'flex-end',
        maxWidth: '75%',
        padding: 3,
        marginBottom: 4,
        backgroundColor: '#dcf8c6',
        borderTopRightRadius: 2,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 13,
        marginHorizontal: 10
    },

    otherMessage: {
        alignSelf: 'flex-start',
        maxWidth: '75%',
        padding: 3,
        marginBottom: 4,
        backgroundColor: '#ffffff',
        marginTop: 2,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 13,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        marginHorizontal: 5
    },
    sentText: {
        marginLeft: 'auto',
        marginRight: 83,
        paddingLeft: 6,
        fontSize: 15
    },

    receivedText: {
        marginRight: 70,
        paddingLeft: 6,
        fontSize: 15
    },

    image: {
        width: 200,
        height: 220,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        top: '92%',
        position: 'absolute',
        zIndex: 5,
        marginHorizontal: 10,
        justifyContent: 'space-between'

    },
    input: {
        flex: 1,
        padding: 8,
        borderRadius: 100,
        marginRight: 8,
        backgroundColor: '#ffffff',

    },

    inpuFflex: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        width: '87%',
        borderRadius: 100,
        paddingHorizontal: 10,
        gap: 8,



    },
    button: {
        backgroundColor: '#007AFF', // WhatsApp blue color
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },

    seenIcon: {
        fontSize: 12,
        color: '#34B7F1',
        marginLeft: 4,
    },
    send: {
        backgroundColor: '#128C7E',
        padding: 10,
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        borderRadius: 100
    },
    estpacio: {
        height: 60
    },
    timestampInput: {
        fontSize: 11.2,
        color: 'rgba(0, 0, 0, 0.6)',
        marginTop: -19,


    },
    sentTimestamp: {
        marginLeft: 'auto',
        marginRight: 0, // Adjust the margin as needed
    },

    receivedTimestamp: {
        marginLeft: 'auto',
        marginRight: 6, // Adjust the margin as needed
    },
    backgroundImage: {

        minHeight: 750,

        resizeMode: 'cover',
        paddingTop: 10,



    },
    modalContainer: {
        flex: 1,

        backgroundColor: '#000',
    },
    modalCloseButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    modalCloseText: {
        color: 'white',
        fontSize: 18,
    },
    modalImage: {
        width: '100%',
        height: '85%',
    },
    modalCloseButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
    },
    icon: {
        marginTop: -19,
    },
    deFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginRight: 5
    },
    deFlex2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        padding: 5,
    },
    deFlex3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,

    },
    receivedimage2: {

        marginRight: 15,
        color: 'rgba(0, 0, 0, 0.6)',
    },
    sentimage2: {
        marginRight: 15,
        color: 'rgba(0, 0, 0, 0.6)',
    },
    iconPuntos: {
        fontSize: 21,
        fontWeight: 'bold',
        transform: [{ rotate: '90deg' }],
        color: '#fff',
    },
});