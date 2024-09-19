import React, { useState } from 'react';

export type ContractType = {
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
    <div>
      <h2>Contract List</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Chain</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {options.map((option) => (
            <tr
              key={option.id}
              onClick={() => handleRowClick(option)}
              style={{ cursor: 'pointer' }}
            >
              <td>{option.chain}</td>
              <td>{option.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {contract && (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Contract</h3>
          <p>
            {contract.name} on {contract.chain}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContractSelector;
