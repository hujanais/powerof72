import { SARequest, SAResponse } from '../Models/data-model';

class ApiService {
  async getData(request: SARequest): Promise<SAResponse[]> {
    const { ticker, principal, addition, frequency, years } = request;

    const url = `${process.env.REACT_APP_SERVER_ENDPOINT}?ticker=${ticker}&principal=${principal}&addition=${addition}&frequency=${frequency}&numOfYears=${years}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}

const _instance = new ApiService();
export default _instance;
