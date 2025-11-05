import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HelloWorld from './pages/HelloWorld';

function App() {
    return (
        <Router>
            <Routes>
                {/* ...existing routes... */}
                <Route path="/hello-world" element={<HelloWorld />} />
                {/* ...existing routes... */}
            </Routes>
        </Router>
    );
}

export default App;