import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

const colors = {
  themeColor: '#fff',
  white: 'black',
  background: '#f4f6fc',
  black: '#778899',
  greyish: '#d3d3d3',
  tint: '#00008b',
  brdcolor: '#dcdcdc',
};

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Selamat Pagi';
  } else if (currentHour < 18) {
    return 'Selamat Siang';
  } else {
    return 'Selamat Malam';
  }
};

// Define the structure of a task
interface Task {
  id: number;
  class: string;
  title: string;
  image: string;
  deadline: string;
}

// Define the structure for the state
interface Tasks {
  [category: string]: Task;
}

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [nickname, setNickname] = useState('');
  const [greeting, setGreeting] = useState(getGreeting());
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();

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
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  const categories = ['All', 'UI/UX', 'Apple Dev', 'Web Dev', 'Thesis', 'IoT'];

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const [tasks, setTasks] = useState<Tasks>({});
  const [tasks2, setTasks2] = useState<Tasks>({});

  // Predefined set of images
  const images: string[] = [
    'https://koma.or.id/wp-content/uploads/2024/02/Frame-4-1024x598.png',
    'https://s3-cdn.cmlabs.co/page/2023/10/04/web-developer-pengertian-tugas-skill-dan-contohnya-295345.png',
    'https://developer.apple.com/news/images/og/apple-developer-og.png',
    'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2021/09/thesis-statement.jpeg',
    'https://www.linknet.id/images/article/DHHIFflXJg.jpg',
  ];

  // Function to get a random image
  const getRandomImage = (): string => {
    return images[Math.floor(Math.random() * images.length)];
  };

  const isFocused = useIsFocused(); // This hook returns true when the screen is focused

  useEffect(() => {
    if (isFocused) {
      axios
        .get('http://127.0.0.1:5000/api/tugas-all') // Adjust the URL to your API endpoint
        .then((response: any) => {
          const formattedTasks = response.data.data.reduce(
            (acc: Tasks, task: any) => {
              acc[task.id] = {
                id: task.id,
                class: task.kategori,
                title: task.nama,
                image: getRandomImage(), // Assigning a random image to each task
                deadline: `Deadline ${new Date(task.deadline).toLocaleString(
                  'id-ID',
                  {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )}`,
              };
              return acc;
            },
            {},
          );
          const formattedTasks2 = response.data.data.reduce(
            (acc: Tasks, task: any) => {
              acc[task.kategori] = {
                id: task.id,
                class: task.kategori,
                title: task.nama,
                image: getRandomImage(), // Assigning a random image to each task
                deadline: `Deadline ${new Date(task.deadline).toLocaleString(
                  'id-ID',
                  {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )}`,
              };
              return acc;
            },
            {},
          );
          setTasks2(formattedTasks2);
          setTasks(formattedTasks);
        })
        .catch((error: void) => {
          console.log('Error fetching tasks:', error);
        });
    }
  }, [isFocused]); // Add `isFocused` to the dependency array

  return (
    <View style={{flex: 1, backgroundColor: colors.themeColor}}>
      <StatusBar barStyle='dark-content' backgroundColor={colors.themeColor} />
      <View style={{backgroundColor: colors.themeColor, flex: 1}}>
        <ScrollView style={{padding: 16, flex: 1}}>
          <Text style={{color: colors.tint, fontSize: 30}}>
            {greeting + ','}
          </Text>
          <Text style={{color: colors.black, fontSize: 30}}>{nickname}</Text>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: colors.brdcolor,
              borderRadius: 20,
              marginVertical: 20,
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons
              name='magnify'
              size={30}
              style={{color: colors.white}}
            />
            <TextInput
              style={{color: colors.white, flex: 1, marginLeft: 10}}
              placeholder='Search'
              placeholderTextColor={colors.white}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <MaterialCommunityIcons
              name='microphone'
              size={30}
              style={{color: colors.white}}
            />
            <MaterialCommunityIcons
              name='tune'
              size={30}
              style={{color: colors.white}}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source={{
                uri: 'https://media.licdn.com/dms/image/D5612AQFlxMRpK-On8g/article-cover_image-shrink_720_1280/0/1670602482212?e=2147483647&v=beta&t=1HWOX81_1_mfqzP2kdHty9dnCVgb-dmVsMuYhBKCnRQ',
              }}
              style={{
                width: 320,
                height: 170,
                borderRadius: 30,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                color: colors.white,
                fontSize: 16,
                marginTop: 8,
                marginRight: 325,
                fontWeight: 'bold',
              }}
            >
              {'Dosen'}
            </Text>
            <View style={styles.circleContainer}>
              <TouchableOpacity
                onPress={() => handleCategoryPress('Apple Dev')}
              >
                <View style={styles.circle}>
                  <Image
                    source={{
                      uri: 'https://bif-sby.telkomuniversity.ac.id/wp-content/uploads/2023/11/daud-scaled-e1699956085516.jpg',
                    }}
                    style={styles.circleImage}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCategoryPress('Web Dev')}>
                <View style={styles.circle}>
                  <Image
                    source={{
                      uri: 'https://bif-sby.telkomuniversity.ac.id/wp-content/uploads/2023/11/Alqis-scaled-e1699955140889.jpg',
                    }}
                    style={styles.circleImage}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCategoryPress('UI/UX')}>
                <View style={styles.circle}>
                  <Image
                    source={{
                      uri: 'https://bif-sby.telkomuniversity.ac.id/wp-content/uploads/2021/05/dzulll.jpg',
                    }}
                    style={styles.circleImage}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCategoryPress('IoT')}>
                <View style={styles.circle}>
                  <Image
                    source={{
                      uri: 'https://bif-sby.telkomuniversity.ac.id/wp-content/uploads/2021/05/khar.jpg',
                    }}
                    style={styles.circleImage}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCategoryPress('Thesis')}>
                <View style={styles.circle}>
                  <Image
                    source={{
                      uri: 'https://bif-sby.telkomuniversity.ac.id/wp-content/uploads/2021/05/al.jpg',
                    }}
                    style={styles.circleImage}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.headerText}>Mata Kuliah</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.categoryContainer}
            >
              {Object.keys(tasks2).map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => handleCategoryPress(category)}
                >
                  <View
                    style={[
                      styles.category,
                      selectedCategory === category && styles.selectedCategory,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === category &&
                          styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {Object.entries(tasks).map(
              ([category, task]) =>
                (selectedCategory === 'All' ||
                  selectedCategory === category) && (
                  <View key={category} style={styles.frameContainer}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('TaskDetail', {task})}
                    >
                      <View style={styles.frame}>
                        <Image
                          source={{uri: task.image}}
                          style={styles.frameImage}
                        />
                        <View>
                          <Text style={styles.frameText}>{task.title}</Text>
                          <Text style={styles.deadlineText}>
                            {task.deadline}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ),
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 32,
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  circle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.tint,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  circleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 31,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginLeft: 32,
  },
  category: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: colors.tint,
  },
  categoryWithBorder: {
    borderWidth: 2,
    borderColor: colors.tint,
  },
  categoryText: {
    color: colors.white,
    fontSize: 16,
  },
  selectedCategoryText: {
    color: colors.themeColor,
  },
  frameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 33,
    marginTop: 20,
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
    width: 50,
    height: 50,
    borderRadius: 10,
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
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 10,
  },
});

export default Home;
