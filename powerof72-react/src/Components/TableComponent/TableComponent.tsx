import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SAResponse } from '../../Models/data-model';
import './TableComponent.scss';

export type TableComponentProps = { jsonArr: SAResponse[] };

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString();
};

const formatDecimals = (value: number) => {
  return value.toFixed(0);
};

export const TableComponent = (props: TableComponentProps) => {
  return (
    <div className='table-container'>
      <TableContainer sx={{ maxHeight: 150 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} stickyHeader size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align='right'>Total Investment</TableCell>
              <TableCell align='right'>Balance(no-divs)</TableCell>
              <TableCell align='right'>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.jsonArr.map((row: SAResponse) => (
              <TableRow key={row.Date} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {formatDate(row.Date)}
                </TableCell>
                <TableCell align='right'>{formatDecimals(row.Investment)}</TableCell>
                <TableCell align='right'>{formatDecimals(row.BalanceNoDivs)}</TableCell>
                <TableCell align='right'>{formatDecimals(row.Balance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
