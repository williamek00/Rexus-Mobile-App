import { StatusBar } from "expo-status-bar";
import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from "react-native";
import { productList } from "../graphql/reactiveVar";
import { useQuery, useReactiveVar, gql } from "@apollo/client";
import { ActivityIndicator, ImageBackground } from "react-native";
import Detail from "./Detail";

const FETCH_PRODUCTS = gql`
  query FetchProducts {
    products {
      id
      name
      description
      price
      Images {
        id
        imgUrl
        productId
      }
      Category {
        id
        name
      }
    }
  }
`;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function Home({ navigation }) {
  const { data, loading, error } = useQuery(FETCH_PRODUCTS);
  const productListValue = useReactiveVar(productList);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  const transformStyle = {
    transform: [{ scale: scaleAnim }],
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) return <Text>Error :</Text>;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1624696612050-73b5891cafcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzF8fGNvZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        }}
        style={styles.background}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://rexus.id/wp-content/uploads/2016/08/rexus_logo_01.png",
            }}
            style={styles.logo}
          />
        </View>

        <AnimatedFlatList
          data={data.products}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Product Detail", {
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  price: item.price,
                  Images: item.Images,
                  Category: item.Category,
                })
              }
            >
              
              <Animated.View style={[styles.card, transformStyle]}>
                <Image
                  source={{ uri: item.Images[0].imgUrl }}
                  style={styles.cardImage}
                />
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.cardsContainer}
          contentContainerStyle={styles.cardsContentContainer}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  cardsContainer: {
    flex: 1,
    marginTop: 100,
  },
  cardsContentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardTitleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    padding: 16,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    backgroundColor: "transparent",
  },
  cardDescription: {
    fontSize: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
