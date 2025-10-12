import React from 'react';
import Navbar from './pages/NavBar';
import { Outlet } from 'react-router-dom';
import './styles/main.css';

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;