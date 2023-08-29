import React, { useState, useEffect } from 'react';
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
export default function ChatMensaje() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        loadMessages();
        loadBackgroundImage();
    }, []);

    const loadMessages = async () => {
        try {
            const storedMessages = await AsyncStorage.getItem('chatMessages');
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages));
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const saveMessages = async () => {
        try {
            await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
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
            setMessages([...messages, newMessage]);
            setInputMessage('');
            saveMessages();
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
            setMessages([...messages, newMessage]);
            setReceivedMessage('');
            saveMessages();
        }
    };
    const handleReceivedImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        const newMessage = {
            text: '',
            sender: 'other',
            image: result.cancelled ? null : result.uri,
        };

        setMessages([...messages, newMessage]);
        saveMessages();
    };

    const handleClearAllMessages = async () => {
        try {
            // Clear messages from state
            setMessages([]);

            // Clear messages from storage
            await AsyncStorage.removeItem('chatMessages');

            // Reload the component to reflect changes
            loadMessages();
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
            setMessages([...messages, newMessage]);
            saveMessages();
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
                    <TouchableOpacity onPress={handleImagePick} >
                        <EvilIcons name="paperclip" size={24} color='rgba(0, 0, 0, 0.4)' />
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
                        <Entypo name="emoji-happy" size={20} color='rgba(0, 0, 0, 0.3)' />



                        <TextInput
                            style={styles.input}
                            placeholder="Mensaje recibido"
                            value={receivedMessage}
                            onChangeText={setReceivedMessage}
                        />

                        <TouchableOpacity onPress={handleReceivedImage} >
                            <EvilIcons name="paperclip" size={24} color='rgba(0, 0, 0, 0.4)' />
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

            <ScrollView style={styles.messageContainer}>
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
                            <Text style={message.sender === 'user' ? styles.sentText : styles.receivedText}>{message.text}</Text>

                            {message.sender === 'user' && message.seen && (
                                <Text style={styles.seenIcon}>✔</Text>
                            )}
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

                        </View>
                    ))}

                    <Modal visible={modalVisible} transparent={true} onRequestClose={closeImageModal}>
                        <View style={styles.modalContainer}>

                            <TouchableOpacity style={styles.modalCloseButton} onPress={closeImageModal}>
                                <AntDesign name="arrowleft" size={24} color="#fff" />
                                <Fontisto name="share-a" size={20} color="#fff" />
                            </TouchableOpacity>
                            <Image source={{ uri: modalImageUri }} style={styles.modalImage} resizeMode="contain" />
                        </View>
                    </Modal>

                    <View style={styles.estpacio}>

                    </View>
                </ImageBackground>
            </ScrollView>

        </View>

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
        marginRight: 70,
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
        marginHorizontal: 8

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
        width: '86%',
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
        marginRight: 10, // Adjust the margin as needed
    },

    receivedTimestamp: {
        marginLeft: 'auto',
        marginRight: 6, // Adjust the margin as needed
    },
    backgroundImage: {

        minHeight: 700,

        resizeMode: 'cover',
        paddingTop: 10

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
        padding: 20
    }
});