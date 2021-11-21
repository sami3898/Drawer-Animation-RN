import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, useIsDrawerOpen } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated'

// Screens
import HomeScreen from '../screens/HomeScreen'
import AboutScreen from '../screens/AboutScreen'
import SettingScreen from '../screens/SettingScreen'

// Objects
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Drawer content
const DrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props} scrollEnabled={false}>
            <DrawerItem 
                label='Home'
                labelStyle={styles.drawerLblStyle}
                onPress={() => props.navigation.navigate('HomeScreen')}
            />
            <DrawerItem 
                label='About'
                labelStyle={styles.drawerLblStyle}
                onPress={() => props.navigation.navigate('AboutScreen')}
            />
            <DrawerItem 
                label='Setting'
                labelStyle={styles.drawerLblStyle}
                onPress={() => props.navigation.navigate('SettingScreen')}
            />
        </DrawerContentScrollView>
    )
};

// Screens

const Screens = ({navigation, style}) => {

    const isDrawerOpen = useIsDrawerOpen()

    return (
        <Animated.View style={[styles.stack, style]}>
            <Stack.Navigator
                screenOptions={{
                    headerTransparent: true,
                    headerTitle: null,
                    headerLeft: () => (
                        <TouchableOpacity onPress={navigation.openDrawer} >
                            <Image source={isDrawerOpen ? require('../res/close.png') : require('../res/menu.png')} style={styles.menu} />
                        </TouchableOpacity>
                    ),
                }}
            >
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='AboutScreen' component={AboutScreen} />
                <Stack.Screen name='SettingScreen' component={SettingScreen} />
            </Stack.Navigator>
        </Animated.View>
    )
}

export default () => {
    const [progress, setProgress] = useState(new Animated.Value(0));

    const scale = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8]
    });

    const borderRadius = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 20]
    });

    const animatedStyle = {borderRadius, transform: [{scale}]};

    return (
        <View style={{flex: 1,backgroundColor: '#B91646'}}>
        <Drawer.Navigator
            backBehavior='none'
            initialRouteName='Home'
            drawerType='slide'
            overlayColor='transparent'
            drawerStyle={styles.drawerStyles}
            drawerContentOptions={{
                activeBackgroundColor: 'transparent',
                activeTintColor: 'white',
                inactiveTintColor: 'white',
            }}
            sceneContainerStyle={styles.scene}
            drawerContent={(props) => {
                setProgress(props.progress)
                console.log('PROPS ' + props.progress)
                return <DrawerContent {...props} />
            }}
        >
            <Drawer.Screen name='Screens'>
                {(props) => <Screens {...props} style={animatedStyle} />}
            </Drawer.Screen>

        </Drawer.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 3,
        overflow: 'hidden',
    },
    drawerStyles: {
        flex: 1, 
        width: '50%', 
        backgroundColor: 'transparent'
    },
    scene: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
    
        elevation: 24,
        backgroundColor: 'transparent',
    },
    menu: {
        width: 28,
        height: 28,
        margin: 20,
        tintColor: '#fff',
        resizeMode: 'contain'
    },
    drawerLblStyle: {
        fontWeight: '600',
        fontSize: 20,
        color: '#fff'
    },

})

