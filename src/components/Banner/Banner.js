import { Text, View } from 'native-base';
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
export const IMAGENAME = require('../../../assets/images/logo.png'); 

const styles = StyleSheet.create({
  root: {},
  image: {},
  text: {
    // color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  innerContainer: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0, 1)',
    borderRadius: 5
  },
});
function Banner(props) {
  //   const { title, image } = props;
  const image = {
    uri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
  };
  return (
    <ImageBackground
      // source={image}
      source={ IMAGENAME } 
      style={{ width: '100%', height: '100%', opacity: 1 }}
      imageStyle={{ borderRadius: 5}}

    >
      {/* <View style={styles.innerContainer}> */}
        {/* <View
          style={{
            width: '100%',
            position: 'absolute',
            top: 20,
            left: 10,
            
          }}
        >
          <Text style={styles.text}>Centered text</Text>
        </View> */}
      {/* </View> */}
    </ImageBackground>
  );
}

export default Banner;
