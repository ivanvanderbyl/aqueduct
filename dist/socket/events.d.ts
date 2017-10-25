export interface Order {
}
/**
 * Namespace containing socket related events
 */
export declare namespace Events {
    interface IPairOrderChangeSubscriptionParams {
        makerTokenAddress: string;
        takerTokenAddress: string;
    }
    interface IAccountOrderChangeSubscriptionParams {
        account: string;
    }
    interface IOrderChangeData {
        order: Order;
        eventType: 'created' | 'filled' | 'canceled' | 'partially-filled' | 'expired' | 'removed';
    }
    abstract class SocketEvent<P, R> {
        private readonly key;
        private params;
        private callback;
        constructor(key: string);
        /**
         * Subscribe to this event
         * @param params Payload to submit to the server
         * @param cb Handler for event broadcasts
         */
        subscribe(params: P, cb: (data: R) => void): this;
        /**
         * Dispose of an active subscription
         */
        unsubscribe(): void;
        protected abstract getListenerChannel(params: P): string;
    }
    /**
     * Subscribe/unsubscribe to events related to orders with a particular maker
     */
    class AccountOrderChanged extends SocketEvent<IAccountOrderChangeSubscriptionParams, IOrderChangeData> {
        constructor();
        protected getListenerChannel(params: IAccountOrderChangeSubscriptionParams): string;
    }
    /**
     * Subscribe/unsubscribe to events related to orders with a particular token pair
     */
    class TokenPairOrderChanged extends SocketEvent<IPairOrderChangeSubscriptionParams, IOrderChangeData> {
        constructor();
        protected getListenerChannel(params: IPairOrderChangeSubscriptionParams): string;
    }
}
