// import './App.css';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import LandingPage from './pages/landing';
// import Authentication from './pages/authentication';
// import { AuthProvider } from './contexts/AuthContext';
// import VideoMeetComponent from './pages/VideoMeet';
// import HomeComponent from './pages/home';
// import History from './pages/history';

// function App() {
//   return (
//     <div className="App">

//       <Router>

//         <AuthProvider>

//           <Routes>

//             <Route path='/' element={<LandingPage />} />
//              <Route path='/auth' element={<Authentication />} />
            
//              <Route path='/history' element={<History />} />
//             <Route path='/:url' element={<VideoMeetComponent />} />
//             <Route path='/home' element={<HomeComponent />} /> 

//           </Routes>  
//         </AuthProvider>

//       </Router>
//     </div>
//   );
// }

// export default App;


import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet';
import HomeComponent from './pages/home';
import History from './pages/history';

function App() {
  return (
    <div className="App">
      {/* Setting up React Router for navigation */}
      <Router>
        {/* Providing authentication context to the entire app */}
        <AuthProvider>
          <Routes>
            {/* Route for Landing Page */}
            <Route path='/' element={<LandingPage />} />

            {/* Route for Authentication (Login/Register) */}
            <Route path='/auth' element={<Authentication />} />

            {/* Route for Meeting History Page */}
            <Route path='/history' element={<History />} />

            {/* Dynamic Route for Video Meeting - Takes a meeting code in URL */}
            <Route path='/:url' element={<VideoMeetComponent />} />

            {/* Route for Home Page */}
            <Route path='/home' element={<HomeComponent />} />
          </Routes>  
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
