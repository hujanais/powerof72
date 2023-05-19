import React from 'react';
import './InterestComponent.scss';
import { InterestResult } from '../../Models/data-model';

export type InterestComponentProps = {
  apr_apy: InterestResult;
};

export const InterestComponent = (props: InterestComponentProps) => {
  return <div className='interest-container'>
    <div>APY-noDivs</div>
    <div>APY</div>
    <div>APR-noDivs</div>
    <div>APR</div>
  </div>
  // return <div>{JSON.stringify(props.apr_apy)}</div>;
};
