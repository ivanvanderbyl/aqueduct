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
const apiUrl = 'localhost:8080';

/**
 * Target ZRX/WETH orders
 */
const baseTokenAddress = '0x34d402f14d58e001d8efbe6585051bf9706aa064';
const quoteTokenAddress = '0x48bacb9266a570d521063ef5dd96e61686dbe788';

/**
 * Address of account that will create the order - account must be unlocked w/ web3 client
 */
const unlockedAccountAddress = '0x6ecbe1db9ef729cbe972c83fb886247691fb6beb';

(async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl));
  const zeroEx = new ZeroEx(web3.currentProvider, { networkId });

  /**
   * Initialize the Aqueduct client with the target API URL
   */
  Aqueduct.Initialize({ host: apiUrl });

  const exchangeContractAddress = zeroEx.exchange.getContractAddress();
  const salt = ZeroEx.generatePseudoRandomSalt();
  const nullAddress = '0x0000000000000000000000000000000000000000';

  /**
   * Calculate fees imposed by ERC dEX
   */
  const getFeesParams: Aqueduct.Api.IStandardGetFeesParams = {
    networkId: networkId,
    request: {
      exchangeContractAddress,
      expirationUnixTimestampSec: new Date().setDate(new Date().getDate() + 3).toString(),
      maker: unlockedAccountAddress,
      /**
       * We're going to buy ZRX, which means the quote token is the maker address
       * In ZRX/WETH (BASE/QUOTE), we are offering WETH (maker) in exchange for ZRX (taker)
       */
      makerTokenAddress: quoteTokenAddress,
      takerTokenAddress: baseTokenAddress,
      /**
       * This comes out to buying 17 ZRX at a rate of .0007 WETH == 1 ZRX
       */
      makerTokenAmount: '11900000000000000',
      takerTokenAmount: '17000000000000000000',
      salt: salt.toString(),
      /**
       * Anyone can fill this order
       */
      taker: nullAddress
    }
  };

  /**
   * Make the API call to get the fees
   */
  const fees = await new Aqueduct.Api.StandardService().getFees(getFeesParams);

  /**
   * Build up params for signing
   */
  const signOrderParams: Aqueduct.Utils.ISignOrderParams = {
    exchangeContractAddress,
    expirationUnixTimestampSec: new Date().setDate(new Date().getDate() + 3),
    maker: unlockedAccountAddress,
    feeRecipient: fees.feeRecipient,
    makerFee: new BigNumber(fees.makerFee),
    makerTokenAddress: getFeesParams.request.makerTokenAddress,
    makerTokenAmount: new BigNumber(getFeesParams.request.makerTokenAmount),
    salt: new BigNumber(getFeesParams.request.salt),
    taker: getFeesParams.request.taker,
    takerFee: new BigNumber(fees.takerFee),
    takerTokenAddress: getFeesParams.request.takerTokenAddress,
    takerTokenAmount: new BigNumber(getFeesParams.request.takerTokenAmount)
  };

  /**
   * Sign an order
   */
  const signedOrder = await Aqueduct.Utils.signOrder({
    client: zeroEx,
    getOrderHashHex: ZeroEx.getOrderHashHex
  }, signOrderParams);

  try {
    /**
     * Create the order in ERC dEX
     */
    const createdOrder = await new Aqueduct.Api.StandardService().create({
      networkId,
      request: signedOrder
    });
    console.log(`Order created: ${JSON.stringify(createdOrder)}`);
  } catch (err) {
    console.log(`Problem creating the order: ${err}`);
  }

  process.exit(0);
})();
