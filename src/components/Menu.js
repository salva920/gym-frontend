import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import './Menu.css';

const Menu = ({ onSearch, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar position="fixed" className={`menu ${scrolled ? 'scrolled' : ''}`}>
      <Toolbar className="toolbar">
        <Typography variant="h6" component="div" className="logo">
          <img src="logo.png" alt="Logo" />
        </Typography>
        <Box className="search">
          <SearchIcon className="searchIcon" />
          <InputBase
            placeholder="Buscar cliente"
            onChange={(e) => onSearch(e.target.value)}
            className="searchInput"
          />
        </Box>
        <IconButton color="inherit" onClick={onLogout} className="logout">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
