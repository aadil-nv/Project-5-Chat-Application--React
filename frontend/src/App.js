// import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';



function App() {
  return (
   
      
      <div className="App">
        <Routes>

        <Route path="/" element={<HomePage />} exact />
        <Route path="/chats" element={<ChatPage />} />
        </Routes>
    </div>
  
  );
}

export default App;
