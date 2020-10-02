import React from 'react';
import { DataTable } from 'react-native-paper';
import { gql, useQuery } from '@apollo/client';

const GET_CUSTOMERS = gql`
  query { customers { id idNumber legalName legalAddress {id} } }
`;

export const CustomersScreen = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);
  const { customers } = data || { customers: [] };
  console.log(`**** customers`, data);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Frozen yogurt</DataTable.Cell>
        <DataTable.Cell numeric>159</DataTable.Cell>
        <DataTable.Cell numeric>6.0</DataTable.Cell>
      </DataTable.Row>

      {customers.map((row: any) => (
      <DataTable.Row key={row.id}>
        <DataTable.Cell numeric>{row.id}</DataTable.Cell>
        <DataTable.Cell>{row.legalName}</DataTable.Cell>
        <DataTable.Cell numeric>{row.idNumber}</DataTable.Cell>
      </DataTable.Row>))
      }

      <DataTable.Pagination
        page={1}
        numberOfPages={3}
        onPageChange={page => {
          console.log(page);
        }}
        label="1-2 of 6"
      />
    </DataTable>
  )
}
