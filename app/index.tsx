import * as React from "react";
import { View, Text, StatusBar, Image } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { ScrollView } from 'react-native-gesture-handler';

const colors = {
    themeColor: "#fff",
    white: "black",
    background: "#f4f6fc",
    black: "#778899",
    greyish: "#d3d3d3",
    tint: "#00008b"
};

const App: React.FC = () => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.themeColor }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.themeColor} />
            <View style={{ backgroundColor: colors.themeColor }}>
                <View style={{
                    padding: 16,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                </View>
                <View style={{ padding: 16 }}>
                    <Text style={{ color: colors.tint, fontSize: 30 }}>
                        {"Selamat Datang,"}
                    </Text>
                    <Text style={{ color: colors.black, fontSize: 30 }}>
                        {"Daffa"}
                    </Text>
                    <View style={{
                        paddingHorizontal: 16,
                        paddingVertical: 6,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: colors.greyish,
                        borderRadius: 20,
                        marginVertical: 20,
                        alignItems: "center"
                    }}>
                        <MaterialCommunityIcons 
                            name="magnify" 
                            size={30} 
                            style={{ color: colors.white }} 
                        />
                        <View style={{ flexDirection: "row" }}>
                            <MaterialCommunityIcons 
                                name="microphone" 
                                size={30} 
                                style={{ color: colors.white }} 
                            />
                            <MaterialCommunityIcons 
                                name="tune" 
                                size={30} 
                                style={{ color: colors.white }} 
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 5 }}>
                        <Image 
                            source={{ uri: 'https://media.licdn.com/dms/image/D5612AQFlxMRpK-On8g/article-cover_image-shrink_720_1280/0/1670602482212?e=2147483647&v=beta&t=1HWOX81_1_mfqzP2kdHty9dnCVgb-dmVsMuYhBKCnRQ' }} 
                            style={{ 
                                width: 320, 
                                height: 170, 
                                borderRadius: 30, 
                                resizeMode: 'contain'
                            }} 
                        />
                        <Text style={{ color: colors.white, fontSize: 16, marginTop: 10, marginRight: 325, fontWeight: "bold" }}>
                            {"Dosen"}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default App;
