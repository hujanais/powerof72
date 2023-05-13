import { useState } from 'react';
import './MainComponent.scss';
import apiService from '../../services/api';
import { InputComponent } from '../InputComponent/InputComponent';
import { ResultComponent } from '../ResultComponent/ResultComponent';
import { SARequest, SAResponse } from '../../Models/data-model';

export const MainComponent = () => {
  const [jsonArr, setJsonArr] = useState<SAResponse[]>([]);

  const handleOnRequest = async (request: SARequest) => {
    const jsonArr = await apiService.getData(request);
    setJsonArr(jsonArr);
  };

  return (
    <div className='main-container'>
      <div className='main-container__card'>
        <div className='action-area'>
          <InputComponent onRequest={handleOnRequest}></InputComponent>
        </div>
        <div className='result-area'>
          <ResultComponent jsonArr={jsonArr}></ResultComponent>
        </div>
      </div>
    </div>
  );
};
