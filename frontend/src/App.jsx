import Navbar from "./components/Navbar";
import AppRouter from "./router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
