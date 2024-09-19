import detectEthereumProvider from '@metamask/detect-provider';
import { providers } from 'ethers';

export const checkWalletConnection = async () => {
  try {
    const provider = (await detectEthereumProvider()) as any;

    const accounts = await provider.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      return accounts;
    } else {
      console.log('No authorized acccount found');
    }
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    const provider = (await detectEthereumProvider()) as any;
    if (!provider) {
      alert('please install metamask');
    }
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    });
    const ethersProvider = new providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    const message = await signer.signMessage(
      'Sign this message to create your identity!',
    );

    return accounts;
  } catch (err) {
    console.log(err);
  }
};
