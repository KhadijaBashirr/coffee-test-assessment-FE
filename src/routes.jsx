import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemsList } from './pages/itemsList';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ItemsList />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
