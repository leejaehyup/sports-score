import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import IndexScreen from "./pages/Index";
import ConfigureScreen from "./pages/Configure";
import GameScreen from "./pages/Game";

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
