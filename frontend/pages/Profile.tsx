import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const colors = {
    themeColor: "#fff",
    white: "black",
    background: "#f4f6fc",
    black: "#778899",
    greyish: "#d3d3d3",
    tint: "#00008b",
    brdcolor: "#dcdcdc"
};

const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
        return "Selamat Pagi";
    } else if (currentHour < 18) {
        return "Selamat Siang";
    } else {
        return "Selamat Malam";
    }
};

const Profile = ({ navigation }) => {
    const [nickname, setNickname] = useState(''); // Ubah inisialisasi nickname
    const [greeting, setGreeting] = useState(getGreeting());

    useEffect(() => {
        const loadNickname = async () => {
            const storedNickname = await AsyncStorage.getItem('nickname');
            if (storedNickname) {
                setNickname(storedNickname);
            }
        };

        loadNickname();
        const timer = setInterval(() => {
            setGreeting(getGreeting());
        }, 60000); // Update greeting setiap menit

        return () => clearInterval(timer);
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('nickname');
            navigation.replace('Login'); // Ganti dengan navigasi ke halaman login
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.greeting}>{greeting},</Text>
                <Text style={styles.nickname}>{nickname}</Text>
                <View style={styles.aboutContainer}>
                    <Text style={styles.aboutTitle}>About This Application</Text>
                    <Text style={styles.aboutText}>
                        Aplikasi ini dibuat untuk membantu mahasiswa Informatika mengelola tugas mereka secara efisien. Aplikasi ini mencakup fitur untuk melihat kategori tugas, deskripsi tugas, dan deadline tugas.
                    </Text>
                    <Text style={styles.aboutText}>
                        Feel free to explore and make the most out of the functionalities provided. We hope this app enhances your learning experience. 👋 
                    </Text>
                </View>
            </ScrollView>
            <Image source={require('../assets/taskify.png')} style={styles.logo} />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.themeColor,
      padding: 16,
      position: 'relative',
  },
  logoutButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: colors.tint,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
  },
  logoutText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
  },
  scrollView: {
      flex: 1,
  },
  logo: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginBottom: 20,
  },
  greeting: {
      color: colors.tint,
      fontSize: 30,
      marginBottom: 8,
  },
  nickname: {
      color: colors.black,
      fontSize: 30,
      marginBottom: 20,
  },
  aboutContainer: {
      backgroundColor: colors.brdcolor,
      padding: 20,
      borderRadius: 20,
      marginTop: 20
  },
  aboutTitle: {
      color: colors.tint,
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 5,
      marginBottom: 20
  },
  aboutText: {
      color: colors.black,
      fontSize: 16,
      marginBottom: 10,
  },
});	

export default Profile;