/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GridImageView from 'react-native-grid-image-viewer';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import products from './products.json';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.sectionContainer, {alignItems: 'center'}]}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Stack = createStackNavigator();

const Restaurant = ({navigation, backgroundStyle, isDarkMode, i, seti}) => {
	return (
		<SafeAreaView style={[backgroundStyle, {alignItems: 'center', justifyContent:'space-evenly', flex:1, flexBasis:50 }]}>
      			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        		<View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}>
          			<Image style={{width:200, height:200}} source={{uri: products[i].photo}}/>
        		</View>
			<Section style={{flex:1}}  title={products[i].title}> </Section>
                        <Button title='menu'onPress={() => navigation.navigate('Menu')}/>
                        <Button title='next' onPress={ () => seti(Math.floor(Math.random()*products.length))}/>
    		</SafeAreaView>
	)
}

const Menu = ({navigation, i, backgroundStyle}) => {
	function imageInterface(){
		let l = []
		for (let j = 0; j < products[i].menu.length; j++){
			l.push({image: products[i].menu[j]})
		}
		return <GridImageView data={l} />
	}
	return (
		<View style={[backgroundStyle ,{flex:1}]}>
			{products[i].menu.length <= 0 ?
			 	<Section title='No menu'></Section>:
				imageInterface()}

		</View>
	)
}

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [i, seti]  = useState(Math.floor(Math.random()*products.length))
  return (
    <NavigationContainer>
    	<Stack.Navigator>
    		<Stack.Screen name='Restaurant'>
			{props => (<Restaurant {...props} backgroundStyle={backgroundStyle} isDarkMode={isDarkMode} i={i} seti={seti}/>)}
		</Stack.Screen>
    		<Stack.Screen name='Menu'>
			{(props) =>  <Menu  {...props} i={i} backgroundStyle={backgroundStyle}/> }
		</Stack.Screen>
    	</Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

