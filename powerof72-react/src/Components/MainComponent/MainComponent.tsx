import { useState } from 'react';
import './MainComponent.scss';
import apiService from '../../services/api';
import { InputComponent } from '../InputComponent/InputComponent';
import { ResultComponent } from '../ResultComponent/ResultComponent';
import { InterestResult, SARequest, SAResponse } from '../../Models/data-model';
import { InterestComponent } from '../InterestComponent/InterestComponent';

export const MainComponent = () => {
  const [jsonArr, setJsonArr] = useState<SAResponse[]>([]);
  const [apr_apy, setAprApy] = useState<InterestResult>({
    apy_nodivs: 0,
    apy_divs: 0,
    apr_nodivs: 0,
    apr_divs: 0,
  });

  //  APR and APY are both measures of interest, but they are calculated differently. APR stands for Annual Percentage Rate and it is the interest rate on an account
  //  plus any fees you'll have to pay. APY stands for Annual Percentage Yield and it is the total amount of interest you earn on an account, taking into account compound interest.

  const calculateAPR = (principal: number, years: number, endingBalance: number) => {
    const apr = (endingBalance - principal) / principal / years;
    return apr * 100;
  };

  const calculateAPY = (principal: number, years: number, endingBalance: number) => {
    const apy = Math.pow(endingBalance / principal, 1 / years) - 1;
    return apy * 100;
  };

  const calculateReturns = (investment: number, balanceWithoutDivs: number, balance: number, years: number): InterestResult => {
    const interestResult: InterestResult = {
      apy_nodivs: 0,
      apy_divs: 0,
      apr_nodivs: 0,
      apr_divs: 0,
    };

    interestResult.apy_nodivs = calculateAPY(investment, years, balanceWithoutDivs);
    interestResult.apy_divs = calculateAPY(investment, years, balance);
    interestResult.apr_nodivs = calculateAPR(investment, years, balanceWithoutDivs);
    interestResult.apr_divs = calculateAPR(investment, years, balance);

    return interestResult;
  };

  const handleOnRequest = async (request: SARequest) => {
    const years = request.years;
    const jsonArr: SAResponse[] = await apiService.getData(request);
    const lastEntry = jsonArr[jsonArr.length - 1];

    const apr_apy = calculateReturns(lastEntry.Investment, lastEntry.BalanceNoDivs, lastEntry.Balance, years);
    setAprApy(apr_apy);
    setJsonArr(jsonArr);
  };

  return (
    <div className='main-container'>
      <div className='main-container__card'>
        <div className='action-area'>
          <InputComponent onRequest={handleOnRequest}></InputComponent>
        </div>
        <div className='result-area'>
          <ResultComponent jsonArr={jsonArr} apr_apy={apr_apy}></ResultComponent>
        </div>
      </div>
    </div>
  );
};
