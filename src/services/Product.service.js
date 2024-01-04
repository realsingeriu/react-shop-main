import axios from 'axios';
import { BASE_API_URL } from '../common/constants';
import { authHeader } from './base.service';

const API_URL = BASE_API_URL + '/api/products';

class ProductService {
  saveProduct(product) {
    return axios.post(API_URL, product, { headers: authHeader() });
  }

  deleteProduct(product) {
    return axios.delete(API_URL + '/' + product.id, { headers: authHeader() });
  }

  getAllProducts() {
    return axios.get(API_URL);
  }
}
//객체로 만들어서 사용(export)
const productService = new ProductService();

export default productService;
