import { AppBar, Toolbar, TextField, IconButton, Box, Badge, InputAdornment } from "@mui/material";
import LogoGapsi from "../../../assets/logo.png";
import useProductStore from "../../stores/products.store";
import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState<string>('');
  const cart = useProductStore((state) => state.cart);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  return (
    <AppBar position="static" color="default" className="shadow-sm p-2">
      <Toolbar className="container d-flex justify-content-between align-items-center">

        <Box fontSize="1.5rem" fontWeight="bold" color="primary.main">
          <img src={LogoGapsi} alt="MiEmpresa" />
        </Box>

        {/* Barra de búsqueda */}
        <Box className="d-flex w-50">
          <form className="d-flex align-items-center w-100" onSubmit={(e) => {
            e.preventDefault();
            fetchProducts(search)
          }}>
            <TextField
              variant="outlined"
              placeholder="Buscar productos..."
              size="small"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton type="submit" color="primary" className="ms-2" onClick={() => fetchProducts(search)}>
              <i className="fas fa-search"></i>
            </IconButton>
          </form>
        </Box>

        {/* Botón de carrito */}
        <Badge badgeContent={cart.length} color="primary">
          <IconButton color="secondary">
            <i className="fas fa-shopping-cart fa-lg"></i>
          </IconButton>
        </Badge>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
