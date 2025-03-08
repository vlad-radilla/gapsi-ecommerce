
import fetchApi from '../http/api';
import { ApiResponse } from '../types/types';

const getProducts = async (
  keyword: string,
  page: number = 1,
  sortBy: string = 'best_match'
): Promise<ApiResponse> => {
  try {
    const data = await fetchApi('/wlm/walmart-search-by-keyword', {
      keyword,
      page,
      sortBy,
    });
    const resFiltered = data.item.props.pageProps.initialData.searchResult?.itemStacks[0].items.filter((e: any) => e.__typename === 'Product');
    return {
      products: resFiltered?.map((product: any) => ({
        id: `${keyword} ${product.productIndex}`,
        name: product.name,
        price: product.price,
        image: product.image,
      })),
      total: data.item.props.pageProps.initialData.searchResult?.aggregatedCount,
      page,
      sortBy,
    } as ApiResponse;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default getProducts;