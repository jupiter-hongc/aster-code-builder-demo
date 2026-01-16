import { createConfig, http } from "wagmi";
import { bsc, mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, bsc],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http("https://ethereum-rpc.publicnode.com", { batch: true }),
    [bsc.id]: http("https://bsc-rpc.publicnode.com", { batch: true }),
  },
});
