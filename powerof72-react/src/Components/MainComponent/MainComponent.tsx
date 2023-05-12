import { useState } from 'react';
import './MainComponent.scss';
import apiService from '../../services/api';
import { InputComponent } from '../InputComponent/InputComponent';
import { ResultComponent } from '../ResultComponent/ResultComponent';
import { SARequest } from '../../Models/data-model';

export const MainComponent = () => {
  const [data, setData] = useState('---');

  const handleOnRequest = (request: SARequest) => {
    console.log(request);
  };

  return (
    <div className='main-container'>
      <div className='main-container__card'>
        <div className='action-area'>
          <InputComponent onRequest={handleOnRequest}></InputComponent>
        </div>
        <div className='result-area'>
          <ResultComponent></ResultComponent>
        </div>
      </div>
    </div>
  );
};
