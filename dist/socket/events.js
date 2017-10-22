"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Namespace containinng socket related events
 */
var Events;
(function (Events) {
    var SocketEvent = /** @class */ (function () {
        function SocketEvent(key) {
            this.key = key;
        }
        /**
         * Subscribe to this event
         * @param params Payload to submit to the server
         * @param cb Handler for event broadcasts
         */
        SocketEvent.prototype.subscribe = function (params, cb) {
            this.params = params;
            this.callback = cb;
            socket.emit('subscribe', {
                key: this.key,
                publishTo: this.getListenerChannel(params),
                data: params
            });
            var callback = function (changeData) { return cb(changeData); };
            socket.on(this.getListenerChannel(params), callback);
            return this;
        };
        /**
         * Dispose of an active subscription
         */
        SocketEvent.prototype.unsubscribe = function () {
            socket.off(this.getListenerChannel(this.params), this.callback);
            socket.emit('unsubscribe', {
                key: this.key,
                data: this.params
            });
        };
        return SocketEvent;
    }());
    Events.SocketEvent = SocketEvent;
    /**
     * Subscribe/unsubscribe to events related to orders with a particular maker
     */
    var AccountOrderChanged = /** @class */ (function (_super) {
        __extends(AccountOrderChanged, _super);
        function AccountOrderChanged() {
            return _super.call(this, 'account-order-change') || this;
        }
        AccountOrderChanged.prototype.getListenerChannel = function (params) {
            return "account-order-change:" + params.account;
        };
        return AccountOrderChanged;
    }(SocketEvent));
    Events.AccountOrderChanged = AccountOrderChanged;
    /**
     * Subscribe/unsubscribe to events related to orders with a particular token pair
     */
    var TokenPairOrderChanged = /** @class */ (function (_super) {
        __extends(TokenPairOrderChanged, _super);
        function TokenPairOrderChanged() {
            return _super.call(this, 'pair-order-change') || this;
        }
        TokenPairOrderChanged.prototype.getListenerChannel = function (params) {
            return "pair-order-change:" + params.makerTokenAddress + ":" + params.takerTokenAddress;
        };
        return TokenPairOrderChanged;
    }(SocketEvent));
    Events.TokenPairOrderChanged = TokenPairOrderChanged;
})(Events = exports.Events || (exports.Events = {}));
//# sourceMappingURL=events.js.map