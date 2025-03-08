import { useEffect } from "react"
import useProductStore from "../../stores/products.store";
import ProductItem from "../molecules/ProductItem";
import { Grid2, Typography } from "@mui/material";
import LoadingModal from "../molecules/LoadingModal";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const ProductsContainer = () => {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const { keyword, sortBy, total, page, loadMoreProducts } = useProductStore();

  /* const handleProducts = async () => {
    try {
      const products = await fetchProducts('laptops', 1, 'best_match');
      console.log('Products:', products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }; */

  useInfiniteScroll(() => {
    if (!loading && page * 50 < total) {
      loadMoreProducts(keyword, page + 1, sortBy);
    }
  });

  useEffect(() => {
    console.log(products)
  }, [products])
  return (
    <Grid2 container className="container mt-3" spacing={2}>
      {
        loading ?
          <LoadingModal open={loading} />
          :
          (
            products.length ? products?.map((product, i) => (
              <ProductItem key={i} product={product} />
            )) : <Typography variant="h4" color="textSecondary">No se encontraron productos</Typography>
          )
      }
    </Grid2>
  )
}

export default ProductsContainer