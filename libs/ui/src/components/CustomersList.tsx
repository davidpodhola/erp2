import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import React from 'react';
import { gql, useQuery } from '@apollo/client';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const GET_CUSTOMERS = gql`
  query { customers { id idNumber legalName legalAddress {id} } }
`;

export const CustomersList = (args) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_CUSTOMERS);
  const { customers } = data || { customers: [] };
  console.log(`**** customers`, data);

  if (loading) return (<span>Loading...</span>);
  if (error) return (<span>`Error! ${error.message}`</span>);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((row) => (
            <TableRow data-testid={row.id} key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.legalName}</TableCell>
              <TableCell align="right">{row.idNumber}</TableCell>
              <TableCell align="right">{row.legalAddress.id}</TableCell>
              <TableCell align="right">{row.legalName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
