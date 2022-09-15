/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// import { StackNavigator } from 'react-navigation';
// import { NoteList } from './app/screens/NoteList';
// import { EditingScreen } from './app/screens/EditingScreen';

// const screens = StackNavigator({
//     NoteList: { screen: NoteList },
//     EditingScreen: { screen: EditingScreen },
// })

AppRegistry.registerComponent(appName, () => App);

//AppRegistry.registerComponent('screens', () => screens);
