/* tslint:disable */
import { ApiService, IRequestParams } from '../api-service';
import { Events as EventNamespace } from '../socket/events';

export namespace Aqueduct {
  let baseUrl: string;
  let apiKey: string | undefined;
  export const Events = EventNamespace;

  export const Initialize = (params: { baseUrl: string, apiKey?: string }) => {
    baseUrl = params.baseUrl;
    apiKey = params.apiKey;
    Events.Initialize(baseUrl);
  };

  export interface IFees {
    feeRecipient: string;
    makerFee: string;
    takerFee: string;
  }

  export interface INetwork {
    id: number;
    label: string;
    url: string;
  }

  export interface Order {
    dateClosed: Date;
    networkId: number;
    exchangeContractAddress: string;
    expirationUnixTimestampSec: number;
    feeRecipient: string;
    maker: string;
    makerFee: string;
    makerTokenAddress: string;
    makerTokenAmount: string;
    salt: string;
    serializedEcSignature: string;
    taker: string;
    takerFee: string;
    takerTokenAddress: string;
    takerTokenAmount: string;
    remainingTakerTokenAmount: string;
    orderHash: string;
    state: number;
    takerEvents: TakerEvent[];
    id: number;
    dateCreated: Date;
    dateUpdated: Date;
  }

  export interface TakerEvent {
    orderId: number;
    takerAmount: string;
    taker: string;
    txHash: string;
    order: Order;
    id: number;
    dateCreated: Date;
    dateUpdated: Date;
  }

  export interface IEcSignature {
    v: number;
    r: string;
    s: string;
  }

  export interface ICreateOrderRequest {
    maker: string;
    taker: string;
    makerTokenAmount: string;
    takerTokenAmount: string;
    makerFee: string;
    takerFee: string;
    makerTokenAddress: string;
    takerTokenAddress: string;
    salt: string;
    feeRecipient: string;
    exchangeContractAddress: string;
    expirationUnixTimestampSec: number;
    orderHash: string;
    networkId: number;
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

  export interface IOrdersGetParams {
    networkId: number;
    makerTokenAddress?: string;
    takerTokenAddress?: string;
    isAscending?: boolean;
    sortOrder?: string;
    maker?: string;
    state?: string;
  }

  export interface IOrdersCreateParams {
    request: ICreateOrderRequest;
  }

  export interface IOrdersGetBestParams {
    makerTokenAddress: string;
    takerTokenAddress: string;
    baseTokenAddress: string;
    quantity: string;
    networkId: number;
    takerAddress: string;
  }

  export interface IReportsGetHistoricalParams {
    networkId: number;
    makerTokenAddress: string;
    takerTokenAddress: string;
    startDate: Date;
    endDate: Date;
  }

  export interface ITakerEventsGetByTakerParams {
    networkId: number;
    taker: string;
  }

  export interface ITakerEventsGetByPairParams {
    networkId: number;
    makerTokenAddress: string;
    takerTokenAddress: string;
  }

  export interface ITokenPairSummariesGetParams {
    networkId: number;
  }

  export interface ITokenPairsGetParams {
    networkId: number;
  }
  export class FeesService extends ApiService {

    public async get() {
      const requestParams: IRequestParams = {
        method: 'GET',
        url: `${baseUrl}/v0/fees`
      };
      return this.executeRequest<IFees>(requestParams);
    };
  }
  export class NetworksService extends ApiService {

    public async getSupported() {
      const requestParams: IRequestParams = {
        method: 'GET',
        url: `${baseUrl}/v0/networks`
      };
      return this.executeRequest<INetwork[]>(requestParams);
    };
  }
  export class OrdersService extends ApiService {

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
        state: params.state,
      };
      return this.executeRequest<Order[]>(requestParams);
    };

    public async create(params: IOrdersCreateParams) {
      const requestParams: IRequestParams = {
        method: 'POST',
        url: `${baseUrl}/v0/orders`
      };
    
      requestParams.body = params.request;
      return this.executeRequest<Order>(requestParams);
    };

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

    public async get(params: ITokenPairSummariesGetParams) {
      const requestParams: IRequestParams = {
        method: 'GET',
        url: `${baseUrl}/v0/token-pair-summaries/${params.networkId}`
      };
      return this.executeRequest<ITokenPairSummary[]>(requestParams);
    };
  }
  export class TokenPairsService extends ApiService {

    public async get(params: ITokenPairsGetParams) {
      const requestParams: IRequestParams = {
        method: 'GET',
        url: `${baseUrl}/v0/token-pairs/${params.networkId}`
      };
      return this.executeRequest<ITokenPair[]>(requestParams);
    };
  }
}
