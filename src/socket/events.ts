import { Aqueduct } from '../generated/api';
import * as io from 'socket.io-client';

/**
 * Namespace containinng socket related events
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
    order: Aqueduct.Order;
    eventType: 'created' | 'filled' | 'canceled' | 'partially-filled' | 'expired' | 'removed';
  }

  let socket: SocketIOClient.Socket | undefined;

  export const Initialize = (baseUrl: string) => {
    socket = io(baseUrl);
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
      const validatedSocket = this.getSocket();

      validatedSocket.emit('subscribe', {
        key: this.key,
        publishTo: this.getListenerChannel(params),
        data: params
      });

      const callback = (changeData: R) => cb(changeData)

      validatedSocket.on(this.getListenerChannel(params), callback);

      return this;
    }

    /**
     * Dispose of an active subscription
     */
    public unsubscribe() {
      const validatedSocket = this.getSocket();

      validatedSocket.off(this.getListenerChannel(this.params), this.callback);
      validatedSocket.emit('unsubscribe', {
        key: this.key,
        data: this.params
      });
    }

    protected abstract getListenerChannel(params: P): string;

    private getSocket() {
      if (!socket) {
        throw new Error('Aqueduct client must be initialized first; see the Aqueduct.Initialize method.');
      }

      return socket;
    }
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
