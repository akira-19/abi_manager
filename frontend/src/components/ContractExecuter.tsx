import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import { getData } from '../utils/api';

type PropsType = {
  provider: ethers.providers.Web3Provider;
  contractId: number;
};

const ContractExecutor: React.FC<PropsType> = ({ provider, contractId }) => {
  const [contractFunctions, setContractFunctions] = useState<any[]>([]);
  const [inputValues, setInputValues] = useState<{ [key: string]: any[] }>({});
  const [results, setResults] = useState<{ [key: string]: string }>({});

  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [abi, setAbi] = useState<string | null>(null);

  const loadContractFunctions = async () => {
    try {
      const data = await getData(`contracts/${contractId}`);
      setAbi(data.abi);
      setContractAddress(data.address);
      const parsedAbi = JSON.parse(data.abi);
      const functions = parsedAbi.filter(
        (item: any) => item.type === 'function',
      );

      const initialInputs: { [key: string]: any[] } = {};
      functions.forEach((func: any) => {
        initialInputs[func.name] = new Array(func.inputs.length).fill('');
      });
      setInputValues(initialInputs);

      setContractFunctions(functions);
    } catch (err) {
      console.error('Failed to read ABI:', err);
    }
  };

  const executeFunction = async (functionName: string) => {
    if (!provider || !contractAddress || !abi || !functionName) {
      alert('input values are missing');
      return;
    }

    try {
      const parsedAbi = JSON.parse(abi);
      const contract = new ethers.Contract(
        contractAddress,
        parsedAbi,
        provider.getSigner(),
      );

      const result = await contract[functionName](...inputValues[functionName]);
      setResults((prevResults) => ({
        ...prevResults,
        [functionName]: result.toString(),
      }));
    } catch (err) {
      console.error(`function error: (${functionName}):`, err);
      alert(`function error (${functionName})`);
    }
  };

  return (
    <Box mt={5}>
      <Typography variant="h5" gutterBottom>
        Execute functions from ABI
      </Typography>
      <Button
        color="inherit"
        variant="outlined"
        onClick={loadContractFunctions}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgb(255, 255, 255, 0.3) !important',
          },
        }}
      >
        Read functions from ABI
      </Button>
      {contractFunctions.length > 0 && (
        <Box mt={5}>
          <Typography variant="h4">Function List</Typography>
          {contractFunctions.map((func, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{ backgroundColor: 'rgba(3,3,3, 0.2)' }}
            >
              <Box mt={3} p={2}>
                <Typography variant="h5" color="white" mb={1}>
                  {func.name}
                </Typography>
                {func.inputs.map((input: any, inputIndex: number) => (
                  <Box key={inputIndex} mt={2} mb={2}>
                    <TextField
                      label={`${input.name} (${input.type})`}
                      variant="outlined"
                      value={inputValues[func.name][inputIndex]}
                      onChange={(e) => {
                        const newValues = [...inputValues[func.name]];
                        newValues[inputIndex] = e.target.value;
                        setInputValues((prevValues) => ({
                          ...prevValues,
                          [func.name]: newValues,
                        }));
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: 'white',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                          },
                        },
                        '& .MuiInputLabel-outlined': {
                          color: 'white',
                        },
                      }}
                    />
                  </Box>
                ))}
                <Button
                  color="inherit"
                  variant="contained"
                  onClick={() => executeFunction(func.name)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgb(255, 255, 255, 0.3) !important',
                    },
                  }}
                >
                  Execute
                </Button>
                {results[func.name] && (
                  <Typography variant="body1" mt={2} color="white">
                    Result: {results[func.name]}
                  </Typography>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ContractExecutor;
