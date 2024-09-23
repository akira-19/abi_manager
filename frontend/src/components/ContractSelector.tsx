import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';

type ContractType = {
  id: number;
  name: string;
  chain: string;
};

type PropsType = {
  options: ContractType[];
  selectContract: (contract: ContractType) => void;
};

const ContractSelector: React.FC<PropsType> = ({ options, selectContract }) => {
  const [contract, setContract] = useState<ContractType | null>(null);

  const handleRowClick = (selectedContract: ContractType) => {
    setContract(selectedContract);
    selectContract(selectedContract);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '50%' }}>
        <Typography variant="h5" gutterBottom>
          Contract List
        </Typography>

        <Table
          sx={{ width: '100%' }}
          size="small"
          aria-label="a contract table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white', width: '30%' }}>
                <b>Chain</b>
              </TableCell>
              <TableCell sx={{ color: 'white', width: '70%' }}>
                <b>Name</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {options.map((option) => (
              <TableRow
                key={option.id}
                hover
                onClick={() => handleRowClick(option)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgb(255, 255, 255, 0.3) !important',
                  },
                }}
              >
                <TableCell sx={{ color: 'white' }}>{option.chain}</TableCell>
                <TableCell sx={{ color: 'white' }}>{option.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {contract && (
          <Box mt={2}>
            <Typography variant="h6">Selected Contract</Typography>
            <Typography variant="body1">
              {contract.name} on {contract.chain}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ContractSelector;
