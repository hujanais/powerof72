import { SARequest, SAResponse } from "../Models/data-model";

class ApiService {
  async getData(request: SARequest): Promise<SAResponse[]> {
    const response = await fetch('http://localhost:3000/api/sa?ticker=qqq&principal=1000&addition=0&frequency=monthly&numOfYears=2');
    const data = await response.json();
    return data;
  }
}

const _instance = new ApiService();
export default _instance;
