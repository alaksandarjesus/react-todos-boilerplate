import './App.css';
import React from 'react';

import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Todo from './pages/Todo';
import NoPage from './components/NoPage';

function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="todo" element={<Todo />} />
          <Route path="todo/:id" element={<Todo />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
