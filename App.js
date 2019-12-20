import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import IndexScreen from "./pages/Index";
import ConfigureScreen from "./pages/Configure";
import GameScreen from "./pages/Game";
import ModalExample from "./pages/example";
import {ScoreProvider} from "./context/ScoreContext";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <ScoreProvider>
        <AppNavigator />
      </ScoreProvider>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Index: {screen: IndexScreen},
    Configure: {screen: ConfigureScreen},
    Game: {screen: GameScreen}
  },
  {
    initialRouteName: "Index"
  }
);
export default createAppContainer(AppNavigator);
