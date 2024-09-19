import React, { useState } from 'react';
import { ethers } from 'ethers';

type PropsType = {
  provider: ethers.providers.Web3Provider;
};

const ContractExecutor: React.FC<PropsType> = ({ provider }) => {
  const [contractFunctions, setContractFunctions] = useState<any[]>([]);
  const [inputValues, setInputValues] = useState<{ [key: string]: any[] }>({});
  const [results, setResults] = useState<{ [key: string]: string }>({});

  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [abi, setAbi] = useState<string | null>(null);

  const loadContractFunctions = () => {
    try {
      const abi = '[]';
      const parsedAbi = JSON.parse(abi);
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

      // 選択した関数の入力値を取得して実行
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
    <div>
      <h2>Execute functions from ABI</h2>

      <button onClick={loadContractFunctions}>Read functions from ABI</button>

      {contractFunctions.length > 0 && (
        <div>
          <h3>Function List</h3>
          {contractFunctions.map((func, index) => (
            <div key={index}>
              <h4>name: {func.name}</h4>

              {func.inputs.map((input: any, inputIndex: number) => (
                <div key={inputIndex}>
                  <label>
                    {input.name} ({input.type}):
                  </label>
                  <input
                    type="text"
                    value={inputValues[func.name][inputIndex]}
                    onChange={(e) => {
                      const newValues = [...inputValues[func.name]];
                      newValues[inputIndex] = e.target.value;
                      setInputValues((prevValues) => ({
                        ...prevValues,
                        [func.name]: newValues,
                      }));
                    }}
                  />
                </div>
              ))}
              <button onClick={() => executeFunction(func.name)}>
                Execute
              </button>
              {results[func.name] && (
                <div>
                  <h5>Result: {results[func.name]}</h5>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractExecutor;
