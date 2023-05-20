import React, { useState , useEffect , useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Animated 
} from "react-native";

const DetailsPage = ({route}) => {
const { id, name, description, price, Images, Category } = route.params;

let images
let setImages

if(name === "Rexus Thunderfox"){
     [images, setImages] = useState([
       {
         id: 1,
         image: {
           uri: "https://rexus.id/wp-content/uploads/2021/04/HX9_3.jpg",
         },
       },
       {
         id: 2,
         image: {
           uri: "https://rexus.id/wp-content/uploads/2021/04/HX9_6.jpg",
         },
       },
       {
         id: 3,
         image: {
           uri: "https://rexus.id/wp-content/uploads/2021/04/HX9_2.jpg",
         },
       },
     ]);
} else if (name === "Rexus Vonix"){
    [images, setImages] = useState([
        {
          id: 1,
          image: {
            uri: "https://rexus.id/wp-content/uploads/2020/02/MP_F30_P_02-1.jpg",
          },
        },
        {
          id: 2,
          image: {
            uri: "https://rexus.id/wp-content/uploads/2020/02/MP_F30_P_03-1.jpg",
          },
        },
        {
          id: 3,
          image: {
            uri: "https://rexus.id/wp-content/uploads/2020/02/MP_F30_W_03.jpg",
          },
        },
      ]);
} else if (name === "Rexus Vonix F22"){
    [images, setImages] = useState([
        {
          id: 1,
          image: {
            uri: "https://rexus.id/wp-content/uploads/2016/10/03-31.jpg",
          },
        },
        {
          id: 2,
          image: {
            uri: "https://rexus.id/wp-content/uploads/2016/10/02-31.jpg",
          },
        },
        {
          id: 3,
          image: {
            uri: "https://rexus.id/wp-content/uploads/2016/10/01-32.jpg",
          },
        },
      ]);
} else if (name === "Rexus Vonix RX995"){
  [images, setImages] = useState([
    {
      id: 1,
      image: {
        uri: "https://rexus.id/wp-content/uploads/2016/10/03-21.jpg",
      },
    },
    {
      id: 2,
      image: {
        uri: "https://rexus.id/wp-content/uploads/2016/10/02-21.jpg",
      },
    },
    {
      id: 3,
      image: {
        uri: "https://rexus.id/wp-content/uploads/2016/10/01-21.jpg",
      },
    },
  ]);
}

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // 2 seconds
      useNativeDriver: true, // Required for performance
    }).start();
  }, []);

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
      <Animated.Text style={[styles.textA, { opacity: fadeAnim }]}>
      WE PROVIDE YOU BEST GAMING EQUIPMENT.
    </Animated.Text>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              source={images[selectedImageIndex].image}
              style={styles.selectedImage}
            />
            <View style={styles.thumbnailContainer}>
              {images.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleImagePress(index)}
                >
                  <Image
                    source={item.image}
                    style={[
                      styles.thumbnailImage,
                      selectedImageIndex === index && styles.selectedThumbnail,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.containerr}>
      <View style={styles.box}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>{description}</Text>
        <Text style={styles.description}>RP.{price}</Text>
        <Text style={styles.description} >{Category.name}</Text>
      </View>
    </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#888',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    color: '#888',
    fontSize: 16,
    lineHeight: 24,
  },
  textA: {
    fontSize: 40, // Set font size to 40
    textAlign: 'center', // Center align text
    color: 'white', // Set font color to white
    fontWeight: 'bold', // Add this line to make the text more bol
  },
    containerr: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25
      },
      box: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
        borderRadius: 10,
      },
      text: {
        color: 'white',
        fontSize: 16,
        textAlign: 'left',
      },
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  selectedImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  thumbnailContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: "white",
  },
  detailsContainer: {
    marginTop: 50,
  },
});

export default DetailsPage;
