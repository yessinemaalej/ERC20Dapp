
import { http, createConfig } from 'wagmi';
import { base, mainnet, optimism, goerli, sepolia } from 'wagmi/chains';
import {
  metaMask,

} from 'wagmi/connectors';

const projectId = '854a2a934dd07464569fffc5dadc699c';

const config = createConfig({
  chains: [mainnet, optimism, base, goerli],
  connectors: [
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [goerli.id]: http(),
    [sepolia.id]: http(),
  },
});
export default config