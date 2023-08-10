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
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function ChatCantidad() {
    const isFocused = useIsFocused();
    const [chats, setChats] = useState([]);
    const navigation = useNavigation();

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editNumero, setEditNumero] = useState('');
    const [editChat, setEditChat] = useState('');
    const [editChatId, setEditChatId] = useState('');
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editChat1, setEditChat1] = useState('');
    const [editChat2, setEditChat2] = useState('');
    const [editNum, setEditNum] = useState('');
    const [editEstate, setEditEstate] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [imageModalVisible, setImageModalVisible] = useState(false);

    const [showHomeComponent, setShowHomeComponent] = useState(true);
    const [showActividad, setShowActividad] = useState(false);

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
    return (
        <View style={styles.cantidadNum}>
            <Text style={styles.text}>{String(chats.length).slice(0, 5)}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    cantidadNum: {
        backgroundColor: '#fff',
        borderRadius: 100

    },
    text: {
        paddingHorizontal: 7,
        paddingVertical: 2,
        fontSize: 12,
        color: '#128C7E'
    }

})