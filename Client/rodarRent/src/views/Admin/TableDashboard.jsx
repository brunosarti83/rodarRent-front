import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useQuery } from "react-query";

const columns = [
  {
    width: 120,
    label: 'Domain',
    dataKey: 'domain',
    numeric: true,
  },
  {
    width: 120,
    label: 'Brand',
    dataKey: 'brand',
    numeric: true,
  },
  {
    width: 120,
    label: 'Model',
    dataKey: 'model',
  },
  {
    width: 120,
    label: 'Amount',
    dataKey: 'pricePerDay',
    numeric: true,
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent({ handleSort }) {
  const handleColumnClick = (column) => {
    handleSort(column.dataKey);
  };

  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: '#2e96ff',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => handleColumnClick(column)}
          className="hover:scale-110 transform transition-transform cursor-pointer"

        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(index, row) {
  const isEvenRow = index % 2 === 0; // Determina si la fila es par o impar
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
          className={`${isEvenRow ? 'bg-gray-200' : 'bg-white'} ${
            column.dataKey === 'finishDate' ? '' : row[column.dataKey]
          }`}
        >
          {column.dataKey === 'finishDate' ? row[column.dataKey].slice(0, 10) : row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function TableDashboard() {
  const queryVehicles = useQuery(["vehicles"], () =>
    fetch("http://localhost:3001/vehicles").then((res) => res.json())
  );

  const [tableData, setTableData] = useState(queryVehicles.data?.results || []);
  const [sortColumn, setSortColumn] = useState(null);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setTableData([...tableData].reverse());
    } else {
      const sortedData = [...tableData].sort((a, b) => {
        return a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
      });
      setTableData(sortedData);
    }
    setSortColumn(column);
  };

  return (
    <div className="text-center text-2xl font-semibold mt-2">
      Vehicles available
      <Paper style={{ height: 400, width: '100%' }}>
        <TableVirtuoso
          data={tableData}
          components={VirtuosoTableComponents}
          fixedHeaderContent={() => fixedHeaderContent({ handleSort })}
          itemContent={rowContent}
        />
      </Paper>
    </div>
  );
}
