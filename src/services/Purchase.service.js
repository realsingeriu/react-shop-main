import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/purchase";

class PurchaseService {
  savePurchase(purchase) {
    return axios.post(API_URL, purchase, { headers: authHeader() });
  }

  getAllPurchases() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}
//객체로 만들어서 사용(export)
const purchaseService = new PurchaseService();

export default purchaseService;
