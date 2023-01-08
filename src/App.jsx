import './colors.css';
import './App.css';
import './components/sidebar/sidebar.css';
import CropTimeCalcScreen from './components/crop_time_calc_screen/crop_time_calc_screen'
import OrchardYieldCalcScreen from './components/orchard_yield_calc_screen/orchard_yield_calc_screen'
import Sidebar from './components/sidebar/sidebar'
import { useState, useEffect } from "react";

function App() {

  const Screens = {
    "CROP_TIME_CALC": 1,
    "ORCHARD_YIELD_CALC": 2,
  }
  
  const {currentScreen, setCurrentScreen} = useState(Screens.CROP_TIME_CALC)

  let activeScreen = Screens.CROP_TIME_CALC;

  useEffect(() => {
    switch (currentScreen) {
      case Screens.ORCHARD_YIELD_CALC:
        activeScreen = OrchardYieldCalcScreen;
        break;
      case Screens.CROP_TIME_CALC:
      default:
        activeScreen = CropTimeCalcScreen;
    }
  }, [currentScreen, activeScreen])
  return (
    <div className="App">
      <Sidebar />
      <div className="contentWrapper">
        <CropTimeCalcScreen />
      </div>
    </div>
  );
}

export default App;

