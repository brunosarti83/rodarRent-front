import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

const userNames = [
  'Alexis',
  'Martin T',
  'Bruno',
  'Gerson',
  'Alejandro',
  'Martin',
  'Matías',
  'Samuel'
];

const sample = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];

function createData(id) {
  const randomUserName = userNames[Math.floor(Math.random() * userNames.length)];
  const randomCarId = Math.floor(Math.random() * 200) + 1;
  const randomAmount = (Math.random() * 100 + 200).toFixed(0); 
  return {id, user: randomUserName, carId: randomCarId, amount: `$${randomAmount}` };
}

const columns = [
  {
    width: 100,
    label: 'ID',
    dataKey: 'id',
    numeric: true,
  },
  {
    width: 120,
    label: 'User',
    dataKey: 'user',
    numeric: true,
  },
  {
    width: 120,
    label: 'Car ID',
    dataKey: 'carId',
    numeric: true,
  },
  {
    width: 120,
    label: 'Finish Date',
    dataKey: 'finishDate',
  },
  {
    width: 120,
    label: 'Amount',
    dataKey: 'amount',
    numeric: true,
  },
];

const rows = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

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

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'honeydew',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
          className={column.dataKey === 'finishDate' ? '' : row[column.dataKey]}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function TableDashboard() {
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
