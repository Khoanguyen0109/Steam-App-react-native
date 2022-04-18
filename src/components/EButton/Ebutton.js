import { Button } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    root: {
        height:  57,
        color: 'white',
        backgroundColor: "#E8005A",
        fontSize: 14,
        fontWeight: "700",
        alignItems: 'center',

    }
})  
function EButton(props) {
    const {title} = props 
  return (
    <Button {...props}   style={styles.root}>
        {title}
    </Button>
  )
}

export default EButton