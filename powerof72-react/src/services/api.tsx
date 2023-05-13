class ApiService {
  getData(ticker: string): string {
    return ticker;
  }
}

const _instance = new ApiService();
export default _instance;
