import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'gcr-quiz',
  // projectId: '3bbc6912041e29eb694de809a39a6cb2',
  projectId: 'YOUR_PROJECT_ID',

  chains: [
    mainnet,
    sepolia,
  ],
});
