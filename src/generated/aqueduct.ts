/* tslint:disable */
import { ApiService, IRequestParams } from '../api-service';
import * as io from 'socket.io-client';

/**
 * ### Background
 * Aqueduct is a protocol published by ERC dEX to faciliate the standardization of sharing liquidity among Øx protocol-compliant relayers. The Aqueduct protocol is outlined here and is embodied in this websocket client (documented below) and a REST API which is documented here.
 *
 * #### Rationale
 * While the Øx Project publishes a recommended relayer API specification that covers much of what relayers will need to share liquidity, additional functionality is needed to ensure timely, standardized information sharing. In particular, the ability to notify the entire network of pooled liquidity providers of an important change must be provided. This cannot be achieved via a traditional REST API without significant work on the part of each relayer.
 *
 * #### Goals for this version
 * This is a pre-alpha version of Aqueduct Client that is focused on simply standardizing a way of notifying liquidity partners of changes in orders placed on one-anothers' books.
 *
 * ### Installation
 * ```
 * npm install aqueduct
 * ```
 */
export namespace Aqueduct {
  let baseUrl: string;
  let apiKey: string | undefined;
  let socket: SocketIOClient.Socket;

  /**
   * Initialize the Aqueduct client. Required to use the client.
   */
  export const Initialize = (params: { baseUrl: string, apiKey?: string }) => {
    baseUrl = params.baseUrl;
    apiKey = params.apiKey;
    socket = io(baseUrl);
  };

  /**
   * Fee structure
   */
  export interface IFees {
    /**
     * Fee recipient - generally the address of the relayer
     */
    feeRecipient: string;
    /**
     * Fee owed by maker
     */
    makerFee: string;
    /**
     * Fee owed by taker
     */
    takerFee: string;
  }

  /**
   * Ethereum network description
   */
  export interface INetwork {
    /**
     * Unique identifier of network
     */
    id: number;
    /**
     * Long description of network
     */
    label: string;
    /**
     * Network endpoint
     */
    url: string;
  }

  /**
   * An order that has been recorded on the ERC dEX Order Book
   */
  export interface Order {
    /**
     * Date on which the order was closed through fill, cancel, etc
     */
    dateClosed: Date;
    /**
     * ID of the Ethereum network the order is associated with
     */
    networkId: number;
    /**
     * 0x Exchange Contract Address
     */
    exchangeContractAddress: string;
    /**
     * Unix timestamp of order expiration (in seconds)
     */
    expirationUnixTimestampSec: number;
    /**
     * Address of the fee recipient
     */
    feeRecipient: string;
    /**
     * Address of the order maker
     */
    maker: string;
    /**
     * Fee due from maker on order fill
     */
    makerFee: string;
    /**
     * Token address of the maker token
     */
    makerTokenAddress: string;
    /**
     * Total amount of maker token in order
     */
    makerTokenAmount: string;
    /**
     * Secure salt
     */
    salt: string;
    /**
     * Serialized version of the EC signature for signed orders
     */
    serializedEcSignature: string;
    /**
     * Taker address; generally a null taker
     */
    taker: string;
    /**
     * Fee due from taker on order fill
     */
    takerFee: string;
    /**
     * Token address of the taker token
     */
    takerTokenAddress: string;
    /**
     * Total amount of taker token in order
     */
    takerTokenAmount: string;
    /**
     * Remaining amount in the order in terms of taker token units
     */
    remainingTakerTokenAmount: string;
    /**
     * The hash of the signed order
     */
    orderHash: string;
    /**
     * State of the order: Open (0), Canceled (1),
Filled (2), Expired(3), Removed(4)
     */
    state: number;
    takerEvents: TakerEvent[];
    /**
     * Unique Identifier
     */
    id: number;
    /**
     * Date of creation
     */
    dateCreated: Date;
    /**
     * Date of updated
     */
    dateUpdated: Date;
  }

  export interface TakerEvent {
    /**
     * ID of the associated order
     */
    orderId: number;
    /**
     * Amount filled on the order
     */
    takerAmount: string;
    /**
     * Address of the order taker
     */
    taker: string;
    /**
     * Associated transaction hash of fill event
     */
    txHash: string;
    order: Order;
    /**
     * Unique Identifier
     */
    id: number;
    /**
     * Date of creation
     */
    dateCreated: Date;
    /**
     * Date of updated
     */
    dateUpdated: Date;
  }

  /**
   * Elliptic Curve Digital Signature
   */
  export interface IEcSignature {
    v: number;
    r: string;
    s: string;
  }

  export interface ICreateOrderRequest {
    /**
     * Order maker
     */
    maker: string;
    /**
     * Order taker; should generally be the null address (0x000...) in the case of ERC dEX
     */
    taker: string;
    /**
     * Amount of maker token in trade
     */
    makerTokenAmount: string;
    /**
     * Amount of taker token in trade
     */
    takerTokenAmount: string;
    /**
     * Fee owed by maker
     */
    makerFee: string;
    /**
     * Fee owed by taker
     */
    takerFee: string;
    /**
     * Address of maker token
     */
    makerTokenAddress: string;
    /**
     * Address of taker token
     */
    takerTokenAddress: string;
    /**
     * Secure salt
     */
    salt: string;
    /**
     * Recipient of owed fees
     */
    feeRecipient: string;
    /**
     * Address of 0x exchange contract
     */
    exchangeContractAddress: string;
    /**
     * Unix timestamp when order expires
     */
    expirationUnixTimestampSec: number;
    /**
     * Secure hash of signed order
     */
    orderHash: string;
    /**
     * ID of Ethereum network
     */
    networkId: number;
    /**
     * Secure EC Signature
     */
    ecSignature: IEcSignature;
  }

  export interface IDateSummary {
    date: Date;
    low?: number;
    high?: number;
    open?: number;
    close?: number;
    volume?: number;
  }

  export interface IToken {
    name: string;
    address: string;
    symbol: string;
    decimals: number;
  }

  export interface ITokenPair {
    tokenA: IToken;
    tokenB: IToken;
  }

  export interface ITokenPairSummary {
    tokenPair: ITokenPair;
    lastPrice?: string;
    netChange?: string;
    bid?: string;
    ask?: string;
  }
  /**
   * Namespace representing REST API for ERC dEX
   */
  export namespace Api {

    export interface IOrdersGetParams {
      /**
       * ID of Ethereum Network
       */
      networkId: number;
      /**
       * Address of maker token
       */
      makerTokenAddress?: string;
      /**
       * Address of taker token
       */
      takerTokenAddress?: string;
      /**
       * Use ascending sort order
       */
      isAscending?: boolean;
      /**
       * Sort order: price or dateCreated
       */
      sortOrder?: string;
      /**
       * Address of maker
       */
      maker?: string;
      isOpen?: boolean;
    }

    export interface IOrdersCreateParams {
      request: ICreateOrderRequest;
    }

    export interface IOrdersGetBestParams {
      /**
       * Address of maker token
       */
      makerTokenAddress: string;
      /**
       * Address of taker token
       */
      takerTokenAddress: string;
      /**
       * Address of base token
       */
      baseTokenAddress: string;
      /**
       * Quantity of pair requested
       */
      quantity: string;
      /**
       * ID of Ethereum network
       */
      networkId: number;
      /**
       * Address of order taker
       */
      takerAddress: string;
    }

    export interface IReportsGetHistoricalParams {
      /**
       * ID of Ethereum network
       */
      networkId: number;
      /**
       * Address of maker token
       */
      makerTokenAddress: string;
      /**
       * Address of taker token
       */
      takerTokenAddress: string;
      /**
       * Start Date
       */
      startDate: Date;
      /**
       * End Date
       */
      endDate: Date;
    }

    export interface ITakerEventsGetByTakerParams {
      /**
       * ID of Ethereum network
       */
      networkId: number;
      /**
       * Address of taker
       */
      taker: string;
    }

    export interface ITakerEventsGetByPairParams {
      /**
       * ID of Ethereum network
       */
      networkId: number;
      /**
       * Address of maker token
       */
      makerTokenAddress: string;
      /**
       * Address of taker token
       */
      takerTokenAddress: string;
    }

    export interface ITokenPairSummariesGetParams {
      /**
       * ID of Ethereum network
       */
      networkId: number;
    }

    export interface ITokenPairsGetParams {
      /**
       * ID of Ethereum network
       */
      networkId: number;
    }
    export class FeesService extends ApiService {

      /**
       * Get fees for an order of described parameters
       */
      public async get() {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseUrl}/v0/fees`
        };
        return this.executeRequest<IFees>(requestParams);
      };
    }
    export class NetworksService extends ApiService {

      /**
       * Get a list of supported networks
       */
      public async getSupported() {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseUrl}/v0/networks`
        };
        return this.executeRequest<INetwork[]>(requestParams);
      };
    }
    export class OrdersService extends ApiService {

      /**
       * Get list of orders
       */
      public async get(params: IOrdersGetParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseUrl}/v0/orders`
        };

        requestParams.queryParameters = {
          networkId: params.networkId,
          makerTokenAddress: params.makerTokenAddress,
          takerTokenAddress: params.takerTokenAddress,
          isAscending: params.isAscending,
          sortOrder: params.sortOrder,
          maker: params.maker,
          isOpen: params.isOpen,
        };
        return this.executeRequest<Order[]>(requestParams);
      };

      /**
       * Create an order
       */
      public async create(params: IOrdersCreateParams) {
        const requestParams: IRequestParams = {
          method: 'POST',
          url: `${baseUrl}/v0/orders`
        };

        requestParams.body = params.request;
        return this.executeRequest<Order>(requestParams);
      };

      /**
       * Get the order(s) representing the best market price
       */
      public async getBest(params: IOrdersGetBestParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseUrl}/v0/orders/best`
        };

        requestParams.queryParameters = {
          makerTokenAddress: params.makerTokenAddress,
          takerTokenAddress: params.takerTokenAddress,
          baseTokenAddress: params.baseTokenAddress,
          quantity: params.quantity,
          networkId: params.networkId,
          takerAddress: params.takerAddress,
        };
        return this.executeRequest<Order>(requestParams);
      };
    }
    export class ReportsService extends ApiService {

      /**
       * Get historical data for order book
       */
      public async getHistorical(params: IReportsGetHistoricalParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseUrl}/v0/reports/historical`
        };

        requestParams.queryParameters = {
          networkId: params.networkId,
          makerTokenAddress: params.makerTokenAddress,
          takerTokenAddress: params.takerTokenAddress,
          startDate: params.startDate,
          endDate: params.endDate,
        };
        return this.executeRequest<IDateSummary[]>(requestParams);
      };
    }
    export class TakerEventsService extends ApiService {

      /**
       * Get Taker Events
       */
      public async getByTaker(params: ITakerEventsGetByTakerParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseUrl}/v0/taker-events/taker`
        };

        requestParams.queryParameters = {
          networkId: params.networkId,
          taker: params.taker,
        };
        return this.executeRequest<TakerEvent[]>(requestParams);
      };

      /**
       * Get Taker Events by token pair
       */
      public async getByPair(params: ITakerEventsGetByPairParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseUrl}/v0/taker-events/pair`
        };

        requestParams.queryParameters = {
          networkId: params.networkId,
          makerTokenAddress: params.makerTokenAddress,
          takerTokenAddress: params.takerTokenAddress,
        };
        return this.executeRequest<TakerEvent[]>(requestParams);
      };
    }
    export class TokenPairSummariesService extends ApiService {

      /**
       * Get a list of token pair summaries
       */
      public async get(params: ITokenPairSummariesGetParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseUrl}/v0/token-pair-summaries/${params.networkId}`
        };
        return this.executeRequest<ITokenPairSummary[]>(requestParams);
      };
    }
    export class TokenPairsService extends ApiService {

      /**
       * Get a list of supported token pairs
       */
      public async get(params: ITokenPairsGetParams) {
        const requestParams: IRequestParams = {
          method: 'GET',
          url: `${baseUrl}/v0/token-pairs/${params.networkId}`
        };
        return this.executeRequest<ITokenPair[]>(requestParams);
      };
    }
  }

    // tslint:disable-next-line:interface-name



/**
 * Namespace containing socket related events
 */
export namespace Events {
  export interface IPairOrderChangeSubscriptionParams {
    makerTokenAddress: string;
    takerTokenAddress: string;
  }

  export interface IAccountOrderChangeSubscriptionParams {
    account: string;
  }

  export interface IOrderChangeData {
    order: Order;
    eventType: 'created' | 'filled' | 'canceled' | 'partially-filled' | 'expired' | 'removed';
  }

  export abstract class SocketEvent<P, R> {
    private params: P;
    private callback: (data: R) => void;

    constructor(private readonly key: string) { }

    /**
     * Subscribe to this event
     * @param params Payload to submit to the server
     * @param cb Handler for event broadcasts
     */
    public subscribe(params: P, cb: (data: R) => void) {
      this.params = params;
      this.callback = cb;

      socket.emit('subscribe', {
        key: this.key,
        publishTo: this.getListenerChannel(params),
        data: params
      });

      const callback = (changeData: R) => cb(changeData);

      socket.on(this.getListenerChannel(params), callback);

      return this;
    }

    /**
     * Dispose of an active subscription
     */
    public unsubscribe() {
      socket.off(this.getListenerChannel(this.params), this.callback);
      socket.emit('unsubscribe', {
        key: this.key,
        data: this.params
      });
    }

    protected abstract getListenerChannel(params: P): string;
  }

  /**
   * Subscribe/unsubscribe to events related to orders with a particular maker
   */
  export class AccountOrderChanged extends SocketEvent<IAccountOrderChangeSubscriptionParams, IOrderChangeData> {
    constructor() {
      super('account-order-change');
    }

    protected getListenerChannel(params: IAccountOrderChangeSubscriptionParams) {
      return `account-order-change:${params.account}`;
    }
  }

  /**
   * Subscribe/unsubscribe to events related to orders with a particular token pair
   */
  export class TokenPairOrderChanged extends SocketEvent<IPairOrderChangeSubscriptionParams, IOrderChangeData> {
    constructor() {
      super('pair-order-change');
    }

    protected getListenerChannel(params: IPairOrderChangeSubscriptionParams) {
      return `pair-order-change:${params.makerTokenAddress}:${params.takerTokenAddress}`;
    }
  }
}

}
