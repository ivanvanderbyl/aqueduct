// tslint:disable-next-line:interface-name
export interface Order {}
// tslint:disable-next-line:interface-name
export interface Notification {}

declare const socket: any;

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

  export interface IAccountNotificationSubscriptionParams {
    account: string;
  }

  export interface IAccountNotificationData {
    notification: Notification;
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
   * Subscribe/unsubscribe to events related to account notifications
   */
  export class AccountNotification extends SocketEvent<IAccountNotificationSubscriptionParams, IAccountNotificationData> {
    constructor() {
      super('account-notification');
    }

    protected getListenerChannel(params: IAccountNotificationSubscriptionParams) {
      return `account-notification:${params.account}`;
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
