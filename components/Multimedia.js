import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
export default function Multimedia() {
    const [images, setImages] = useState([]);
    const [storedImages, setStoredImages] = useState([]);

    useEffect(() => {
        fetchImagesFromStorage();
    }, []);

    const fetchImagesFromStorage = async () => {
        try {
            const storedImages = await AsyncStorage.getItem('storedImages');
            if (storedImages) {
                setStoredImages(JSON.parse(storedImages));
            }
        } catch (error) {
            console.error('Error fetching images from storage:', error);
        }
    };

    const saveImagesToStorage = async () => {
        try {
            const existingStoredImages = await AsyncStorage.getItem('storedImages');
            const newStoredImages = existingStoredImages ? JSON.parse(existingStoredImages) : [];

            await AsyncStorage.setItem('storedImages', JSON.stringify([...newStoredImages, ...images]));
            setStoredImages([...newStoredImages, ...images]);
            setImages([]); // Limpiamos las imágenes seleccionadas después de guardarlas
        } catch (error) {
            console.error('Error saving images to storage:', error);
        }
    };

    const removeImage = async (imageId) => {
        const updatedImages = images.filter((image) => image.id !== imageId);
        setImages(updatedImages);

        const updatedStoredImages = storedImages.filter((image) => image.id !== imageId);
        setStoredImages(updatedStoredImages);

        await AsyncStorage.setItem('storedImages', JSON.stringify(updatedStoredImages));
    };

    const selectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            console.log('Permission denied');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const newImage = {
                uri: result.uri,
                id: String(new Date().getTime()),
            };

            setImages((prevImages) => [...prevImages, newImage]);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={selectImage} style={styles.buttonFlex}>
                <Text style={styles.text}> Archivos, enlaces y docs.</Text>
                <View style={styles.deFlex}>
                    <Text style={styles.text}> {storedImages.length}</Text>
                    <Entypo name="chevron-small-right" size={24} color='rgba(0, 0, 0, 0.6)' />
                </View>
            </TouchableOpacity>
            <ScrollView horizontal>
                <View style={styles.imagesContainer}>
                    {images.length === 0 && storedImages.length === 0 ? (
                        < >
                            <TouchableOpacity onPress={selectImage} >
                                <View style={styles.imageNohay}>
                                    <Text style={styles.text}>Agregar imagen</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={selectImage} >
                                <View style={styles.imageNohay}>
                                    <Text style={styles.text}>Agregar imagen</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={selectImage} >
                                <View style={styles.imageNohay}>
                                    <Text style={styles.text}>Agregar imagen</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={selectImage} >
                                <View style={styles.imageNohay}>
                                    <Text style={styles.text}>Agregar imagen</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={selectImage} >
                                <View style={styles.imageNohay}>
                                    <Text style={styles.text}>Agregar imagen</Text>
                                </View>
                            </TouchableOpacity>


                        </>
                    ) : (
                        [...images, ...storedImages].map((item) => (
                            <View key={item.id} style={styles.imageWrapper}>
                                <Image source={{ uri: item.uri }} style={styles.image} />
                                <TouchableOpacity onPress={() => removeImage(item.id)} style={styles.deleteButton}>
                                    <Text style={styles.deleteButtonText}>X</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}

                </View>
            </ScrollView>
            {images.length > 0 && (
                <TouchableOpacity onPress={saveImagesToStorage} style={styles.button}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 10,
        paddingVertical: 10
    },
    button: {
        padding: 7,
        backgroundColor: '#25D366',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
        width: 100,
        left: '6%',
        borderRadius: 5
    },
    buttonText: {
        color: 'rgba(255, 255, 255, 0.9)',
    },
    imagesContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 15
    },
    imageWrapper: {
        marginRight: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,

    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    deleteButtonText: {
        color: 'rgba(255, 255, 255, 0.6)',
    },
    buttonFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,


    },
    deFlex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.6)',
    },
    imageNohay: {
        width: 100,
        height: 100,
        backgroundColor: '#EEF3F4',
        borderRadius: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 20
    }

});
