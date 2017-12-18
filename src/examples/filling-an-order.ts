import { ZeroEx } from '0x.js';
import { BigNumber } from 'bignumber.js';
import * as Web3 from 'web3';
import { Aqueduct } from '../generated/aqueduct';

/**
 * Points to local TestRPC
 * For production, point to a Kovan or Mainnet node
 */
const networkUrl = 'http://localhost:8545';
const networkId = 50;

/**
 * Points to local API server
 * For production, point to https://api.ercdex.com
 */
const apiUrl = 'http://localhost:8080';

/**
 * Target ZRX/WETH orders
 */
const baseTokenAddress = '0x34d402f14d58e001d8efbe6585051bf9706aa064';
const quoteTokenAddress = '0x48bacb9266a570d521063ef5dd96e61686dbe788';

/**
 * Address of account that will fill the order - account must be unlocked w/ web3 client
 */
const unlockedAccountAddress = '0x6ecbe1db9ef729cbe972c83fb886247691fb6beb';

(async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl));
  const zeroEx = new ZeroEx(web3.currentProvider, { networkId });

  /**
   * Initialize the Aqueduct client with the target API URL
   */
  Aqueduct.Initialize({ baseUrl: apiUrl });

  /**
   * Get some orders
   */
  const orders = await new Aqueduct.Api.StandardService().getOrderbook({
    networkId,
    page: 1,
    per_page: 3,
    baseTokenAddress,
    quoteTokenAddress
  });

  /**
   * Find an order to fill
   * In this case, we're getting a list of bids ('buy orders' and getting the best order)
   */
  const order = orders.bids[0];

  /**
   * Process the raw order as provided by the API, convert numbers to BigNumber, etc
   */
  const signedOrder = Aqueduct.Utils.convertStandardOrderToSignedOrder(order);

  try {
    /**
     * Fill the order
     */
    const tx = await zeroEx.exchange.fillOrderAsync(signedOrder, new BigNumber(order.remainingTakerTokenAmount), true, unlockedAccountAddress);
    console.log(`Order filled: ${tx}`);
  } catch (err) {
    console.log(`Problem filling the order: ${err}`);
  }

  process.exit(0);
})();
