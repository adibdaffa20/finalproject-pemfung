import * as React from "react";
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const colors = {
    themeColor: "#fff",
    white: "black",
    background: "#f4f6fc",
    black: "#778899",
    greyish: "#d3d3d3",
    tint: "#00008b",
    brdcolor: "#dcdcdc"
};

const App: React.FC = () => {
    const [allSelected, setAllSelected] = React.useState(true);

    const handleAllPress = () => {
        setAllSelected(true);
        // Handle action when "All" is pressed
    };

    const handleSearchPress = () => {
        // Handle action when search bar is pressed
    };

    const handleCategoryPress = (category: string) => {
        // Handle action when category frame is pressed
    };

    const handleFramePress = (frame: string) => {
        // Handle action when the frame is pressed
    };

    const handleFooterButtonPress = (buttonName: string) => {
        // Handle action when footer button is pressed
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.themeColor }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.themeColor} />
            <View style={{ backgroundColor: colors.themeColor, flex: 1 }}>
                <View style={{
                    padding: 16,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                </View>
                <ScrollView style={{ padding: 16, flex: 1 }}>
                    <Text style={{ color: colors.tint, fontSize: 30 }}>
                        {"Selamat Datang,"}
                    </Text>
                    <Text style={{ color: colors.black, fontSize: 30 }}>
                        {"Daffa"}
                    </Text>
                    <TouchableOpacity onPress={handleSearchPress}>
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
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Image 
                            source={{ uri: 'https://media.licdn.com/dms/image/D5612AQFlxMRpK-On8g/article-cover_image-shrink_720_1280/0/1670602482212?e=2147483647&v=beta&t=1HWOX81_1_mfqzP2kdHty9dnCVgb-dmVsMuYhBKCnRQ' }} 
                            style={{ 
                                width: 320, 
                                height: 170, 
                                borderRadius: 30, 
                                resizeMode: 'contain'
                            }} 
                        />
                        <Text style={{ color: colors.white, fontSize: 16, marginTop: 8, marginRight: 325, fontWeight: "bold" }}>
                            {"Dosen"}
                        </Text>
                        <View style={styles.circleContainer}>
                            {[...Array(5)].map((_, index) => (
                                <View key={index} style={styles.circle} />
                            ))}
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: colors.white, fontSize: 15, fontWeight: "bold", marginLeft: 3, marginBottom: 10 }}>
                            {"Mata Kuliah"}
                        </Text>
                        <View style={styles.categoryContainer}>
                            <TouchableOpacity onPress={() => handleCategoryPress("All")}>
                                <View style={[styles.category, allSelected && styles.selectedCategory]}>
                                    <Text style={[styles.categoryText, allSelected && styles.selectedCategoryText]}>All</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleCategoryPress("UI/UX")}>
                                <View style={styles.category}>
                                    <Text style={styles.categoryText}>UI/UX</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleCategoryPress("Apple Dev")}>
                                <View style={styles.category}>
                                    <Text style={styles.categoryText}>Apple Dev</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleCategoryPress("Web Dev")}>
                                <View style={styles.category}>
                                    <Text style={styles.categoryText}>Web Dev</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.frameContainer}>
                            <TouchableOpacity onPress={() => handleFramePress("UI/UX")}>
                                <View style={styles.frame}>
                                    <Image 
                                        source={{ uri: 'https://koma.or.id/wp-content/uploads/2024/02/Frame-4-1024x598.png' }} 
                                        style={styles.frameImage} 
                                    />
                                    <View>
                                        <Text style={styles.frameText}>Introduction UI/UX</Text>
                                        <Text style={styles.deadlineText}>Deadline Senin, 17 Juni 23.59</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.frameContainer}>
                            <TouchableOpacity onPress={() => handleFramePress("Web Dev")}>
                                <View style={styles.frame}>
                                    <Image 
                                        source={{ uri: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/is_web_development_good_career.jpg' }} 
                                        style={styles.frameImage} 
                                    />
                                    <View>
                                        <Text style={styles.frameText}>Styling CSS</Text>
                                        <Text style={styles.deadlineText}>Deadline Selasa, 18 Juni 23.59</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.frameContainer}>
                            <TouchableOpacity onPress={() => handleFramePress("Apple Dev")}>
                                <View style={styles.frame}>
                                    <Image 
                                        source={{ uri: 'https://developer.apple.com/news/images/og/apple-developer-og.png' }} 
                                        style={styles.frameImage} 
                                    />
                                    <View>
                                        <Text style={styles.frameText}>Introduction Swift</Text>
                                        <Text style={styles.deadlineText}>Deadline Rabu, 19 Juni 23.59</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => handleFooterButtonPress("Home")}>
                    <MaterialCommunityIcons 
                        name="home" 
                        size={30} 
                        style={{ color: colors.white }} 
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFooterButtonPress("My Course")}>
                    <MaterialCommunityIcons 
                        name="book" 
                        size={30} 
                        style={{ color: colors.white }} 
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFooterButtonPress("Profile")}>
                    <MaterialCommunityIcons 
                        name="account" 
                        size={30} 
                        style={{ color: colors.white }} 
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    circleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5
    },
    circle: {
        width: 62,
        height: 62,
        borderRadius: 30,
        backgroundColor: colors.tint,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginLeft: 32
    },
    category: {
        backgroundColor: colors.background,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 10
    },
    selectedCategory: {
        backgroundColor: colors.tint, // Blue color when selected
    },
    categoryText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    selectedCategoryText: {
        color: colors.themeColor, // Text color when selected
    },
    frameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 33,
        marginTop: 20
    },
    frame: {
        backgroundColor: colors.brdcolor,
        paddingVertical: 8,
        paddingHorizontal: 40,
        marginHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
    },
    frameImage: {
        width: 50, // Increased width
        height: 50, // Increased height
        borderRadius: 10, // Adjusted for the new size
        marginRight: 40,
    },
    frameText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
    deadlineText: {
        color: colors.white,
        fontSize: 14,
        marginLeft: 10,
        marginTop: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.background,

        paddingVertical: 10,
    },
});

export default App;
