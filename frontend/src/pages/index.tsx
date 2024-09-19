import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

import { connectWallet, checkWalletConnection } from '../utils/wallet';
import { isAuthenticated } from '../utils/jwt';
import ContractExecutor from '../components/ContractExecuter';
import ContractSelector from '../components/ContractSelector';
import { ethers } from 'ethers';
import { getData } from '../utils/api';

const style = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
};

type ContractType = {
  id: number;
  name: string;
  chain: string;
};

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<ContractType | null>(null);
  const [contracts, setContracts] = useState<ContractType[]>([]);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  const checkWalletIsConnected = async () => {
    try {
      const accounts = await checkWalletConnection();
      if (accounts && accounts.length > 0) {
        const account = accounts[0];
        setCurrentAccount(account);

        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        await newProvider.send('eth_requestAccounts', []);
        setProvider(newProvider);
      } else {
        console.log('No authorized acccount found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletHandler = async () => {
    try {
      const accounts = await connectWallet();

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const contractSelectHandler = (selectedContract: ContractType) => {
    setContract(selectedContract);
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData('contracts');
        console.log(data);
        setContracts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout home>
      <div style={style}>
        {currentAccount && provider ? (
          <div className="main-app">
            <h1 style={{ fontSize: '60px', color: 'white', marginTop: '75px' }}>
              ABI Manager
            </h1>
            <ContractSelector
              options={contracts}
              selectContract={contractSelectHandler}
            />
            {contract && <ContractExecutor provider={provider} />}
          </div>
        ) : (
          <div className="main-app">
            <h1 style={{ fontSize: '60px', color: 'white', marginTop: '75px' }}>
              ABI Manager
            </h1>
            <div onClick={connectWalletHandler}>
              <a href="">Signin by wallet</a>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
