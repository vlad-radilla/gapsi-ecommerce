import { Button, Card, CardActions, CardContent, CardMedia, Grid2, Typography } from '@mui/material'
import { Product } from '../../types/types'
import { formatCurrency } from '../../utils/utils'
import useProductStore from '../../stores/products.store'

interface ProductItemProps {
  product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
  const addItemToCart = useProductStore((state) => state.addItemToCart)
  return (
    <Grid2 size={4}>

      <Card sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          image={product.image}
          className='w-50 m-auto'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.id} - {formatCurrency(product.price.toString())}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {product.name}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Share</Button> */}
          <Button size="small" onClick={() => addItemToCart(product)}>Agregar a carrito</Button>
        </CardActions>
      </Card>
    </Grid2>
  )
}

export default ProductItem