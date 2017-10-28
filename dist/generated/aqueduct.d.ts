import { ApiService } from '../api-service';
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
export declare namespace Aqueduct {
    /**
     * Initialize the Aqueduct client. Required to use the client.
     */
    const Initialize: (params: {
        baseUrl: string;
        apiKey?: string | undefined;
    }) => void;
    /**
     * Fee structure
     */
    interface IFees {
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
    interface INetwork {
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
     * A notification meant for consumption by clients
     */
    interface Notification {
        /**
         * Hex address of account associated with notification
         */
        account: string;
        /**
         * Text label of notification
         */
        label: string;
        /**
         * Date the notification expires
         */
        expirationDate: Date;
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
     * An order that has been recorded on the ERC dEX Order Book
     */
    interface Order {
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
    interface TakerEvent {
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
    interface IEcSignature {
        v: number;
        r: string;
        s: string;
    }
    interface ICreateOrderRequest {
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
    interface IDateSummary {
        date: Date;
        low?: number;
        high?: number;
        open?: number;
        close?: number;
        volume?: number;
    }
    interface IToken {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
    }
    interface ITokenPair {
        tokenA: IToken;
        tokenB: IToken;
    }
    interface ITokenPairSummary {
        tokenPair: ITokenPair;
        lastPrice?: string;
        netChange?: string;
        bid?: string;
        ask?: string;
    }
    /**
     * Namespace representing REST API for ERC dEX
     */
    namespace Api {
        interface INotificationsGetParams {
            account: string;
        }
        interface IOrdersGetParams {
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
        interface IOrdersCreateParams {
            request: ICreateOrderRequest;
        }
        interface IOrdersGetBestParams {
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
        interface IReportsGetHistoricalParams {
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
        interface ITakerEventsGetByTakerParams {
            /**
             * ID of Ethereum network
             */
            networkId: number;
            /**
             * Address of taker
             */
            taker: string;
        }
        interface ITakerEventsGetByPairParams {
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
        interface ITokenPairSummariesGetParams {
            /**
             * ID of Ethereum network
             */
            networkId: number;
        }
        interface ITokenPairsGetParams {
            /**
             * ID of Ethereum network
             */
            networkId: number;
        }
        class FeesService extends ApiService {
            /**
             * Get fees for an order of described parameters
             */
            get(): Promise<IFees>;
        }
        class NetworksService extends ApiService {
            /**
             * Get a list of supported networks
             */
            getSupported(): Promise<INetwork[]>;
        }
        class NotificationsService extends ApiService {
            /**
             * Get active notifications for an account
             */
            get(params: INotificationsGetParams): Promise<Notification[]>;
        }
        class OrdersService extends ApiService {
            /**
             * Get list of orders
             */
            get(params: IOrdersGetParams): Promise<Order[]>;
            /**
             * Create an order
             */
            create(params: IOrdersCreateParams): Promise<Order>;
            /**
             * Get the order(s) representing the best market price
             */
            getBest(params: IOrdersGetBestParams): Promise<Order>;
        }
        class ReportsService extends ApiService {
            /**
             * Get historical data for order book
             */
            getHistorical(params: IReportsGetHistoricalParams): Promise<IDateSummary[]>;
        }
        class TakerEventsService extends ApiService {
            /**
             * Get Taker Events
             */
            getByTaker(params: ITakerEventsGetByTakerParams): Promise<TakerEvent[]>;
            /**
             * Get Taker Events by token pair
             */
            getByPair(params: ITakerEventsGetByPairParams): Promise<TakerEvent[]>;
        }
        class TokenPairSummariesService extends ApiService {
            /**
             * Get a list of token pair summaries
             */
            get(params: ITokenPairSummariesGetParams): Promise<ITokenPairSummary[]>;
        }
        class TokenPairsService extends ApiService {
            /**
             * Get a list of supported token pairs
             */
            get(params: ITokenPairsGetParams): Promise<ITokenPair[]>;
        }
    }
    /**
     * Namespace containing socket related events
     */
    namespace Events {
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
        interface IAccountNotificationSubscriptionParams {
            account: string;
        }
        interface IAccountNotificationData {
            notification: Notification;
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
         * Subscribe/unsubscribe to events related to account notifications
         */
        class AccountNotification extends SocketEvent<IAccountNotificationSubscriptionParams, IAccountNotificationData> {
            constructor();
            protected getListenerChannel(params: IAccountNotificationSubscriptionParams): string;
        }
        /**
         * Subscribe/unsubscribe to events related to orders with a particular token pair
         */
        class TokenPairOrderChanged extends SocketEvent<IPairOrderChangeSubscriptionParams, IOrderChangeData> {
            constructor();
            protected getListenerChannel(params: IPairOrderChangeSubscriptionParams): string;
        }
    }
}
