import PropTypes from "prop-types";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

Card.PropTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    onPress: PropTypes.func,
};

Card.defaultProps = {
    title: "Default Title",
    description: "Default Description",
    image: "src",
};

export default function Card ({ title, description, image, onPress }) {
    const [error, setError] = useState(false);

    const handleImageLoad = () => {
        setError(false);
    }

    const handleImageError = (error) => {
        setError(error);
    }

    return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={image}
        onError={handleImageError}
        onLoad={handleImageLoad}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <TouchableOpacity onPress={onPress} style={{padding: 10, backgroundColor: "blue", borderRadius: 5}}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <Text style={styles.description}>{description}</Text>
      </View>
      {error && (
        <Text style={styles.altText}>
          Error: Image could not be loaded.
        </Text>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
    card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 12,
    marginBottom: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
  altText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 8,
  },
});

