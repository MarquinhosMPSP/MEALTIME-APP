import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from './Login/index'
import Home from './home'


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Home
    })

);

export default Routes