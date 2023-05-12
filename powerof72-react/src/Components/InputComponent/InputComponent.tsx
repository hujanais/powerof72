import { useState } from 'react';
import './InputComponent.scss';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { Button } from '@mui/material';
import { FrequencyOptions, SARequest } from '../../Models/data-model';

export type InputComponentProps = { onRequest: (request: SARequest) => void };

export const InputComponent = (props: InputComponentProps) => {
  const [ticker, setTicker] = useState('VTI');
  const [principal, setPrincipal] = useState(1000);
  const [addition, setAddition] = useState(100);
  const [frequency, setFrequency] = useState<FrequencyOptions>('monthly');
  const [years, setYears] = useState<number>(30);

  const handleTickerChanged = (e: any) => {
    setTicker(e.target.value);
  };

  const handlePrincipalChanged = (e: any) => {
    setPrincipal(e.target.value);
  };

  const handleAdditionChanged = (e: any) => {
    setAddition(e.target.value);
  };

  const handleFrequencyChanged = (e: any) => {
    setFrequency(e.target.value);
  };

  const handleYearsChanged = (e: any) => setYears(e.target.value);

  const doCalculate = () => {
    const requestBody: SARequest = {
      ticker,
      principal,
      addition,
      frequency: frequency,
      years,
    };
    props.onRequest(requestBody);
  };

  return (
    <div className='input-container'>
      <TextField label='Ticker' variant='outlined' value={ticker} onChange={handleTickerChanged} />
      <TextField label='Principal' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={principal} onChange={handlePrincipalChanged} />
      <TextField label='Addition' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={addition} onChange={handleAdditionChanged} />
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel>Frequency</InputLabel>
        <Select value={frequency} label='Frequency' onChange={handleFrequencyChanged}>
          <MenuItem value={'weekly'}>Weekly</MenuItem>
          <MenuItem value={'biweekly'}>Biweekly</MenuItem>
          <MenuItem value={'monthly'}>Monthly</MenuItem>
          <MenuItem value={'quarterly'}>Quarterly</MenuItem>
          <MenuItem value={'biannually'}>Biannually</MenuItem>
          <MenuItem value={'annually'}>Annually</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel>Years</InputLabel>
        <Select value={years} label='Years' onChange={handleYearsChanged}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <Button variant='contained' onClick={doCalculate}>
        Calculate
      </Button>
    </div>
  );
};
