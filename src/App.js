import logo from "./logo.svg";
import "./App.css";
import AppView from "./pages/appView";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <AppView />
      </ChakraProvider>
    </div>
  );
}

export default App;
