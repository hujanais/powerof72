import React from 'react';
import './InterestComponent.scss';
import { InterestResult } from '../../Models/data-model';

export type InterestComponentProps = {
  apr_apy: InterestResult;
};

export const InterestComponent = (props: InterestComponentProps) => {
  return <div>{JSON.stringify(props.apr_apy)}</div>;
};
