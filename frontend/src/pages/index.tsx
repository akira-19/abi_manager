import { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

import { connectWallet } from '../utils/connectWallet';
import { checkWalletConnection } from '../utils/checkWalletConnection';

const style = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
};

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  const checkWalletIsConnected = async () => {
    try {
      const accounts = await checkWalletConnection();
      if (accounts && accounts.length > 0) {
        const account = accounts[0];
        setCurrentAccount(account);
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

  useEffect(() => {
    checkWalletIsConnected();
  }, []);
  return (
    <Layout home>
      <div style={style}>
        {currentAccount ? (
          <div className="main-app">
            <h1 style={{ fontSize: '60px', color: 'white', marginTop: '75px' }}>
              ABI Manager
            </h1>
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
