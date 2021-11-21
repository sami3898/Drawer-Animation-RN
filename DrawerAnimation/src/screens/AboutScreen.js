import React from 'react'
import { View, Text } from 'react-native'

const AboutScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#998CEB',}}>
            <Text style={{fontSize: 34, color: '#fff', fontWeight: 'bold'}}>About</Text>
        </View>
    )
}

export default AboutScreen
