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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var api_service_1 = require("../api-service");
var io = require("socket.io-client");
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
var Aqueduct;
(function (Aqueduct) {
    var baseUrl;
    var apiKey;
    var socket;
    /**
     * Initialize the Aqueduct client. Required to use the client.
     */
    Aqueduct.Initialize = function (params) {
        baseUrl = params.baseUrl;
        apiKey = params.apiKey;
        socket = io(baseUrl);
    };
    /**
     * Namespace representing REST API for ERC dEX
     */
    var Api;
    (function (Api) {
        var FeesService = /** @class */ (function (_super) {
            __extends(FeesService, _super);
            function FeesService() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Get fees for an order of described parameters
             */
            FeesService.prototype.get = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var requestParams;
                    return __generator(this, function (_a) {
                        requestParams = {
                            method: 'GET',
                            url: baseUrl + "/v0/fees"
                        };
                        return [2 /*return*/, this.executeRequest(requestParams)];
                    });
                });
            };
            ;
            return FeesService;
        }(api_service_1.ApiService));
        Api.FeesService = FeesService;
        var NetworksService = /** @class */ (function (_super) {
            __extends(NetworksService, _super);
            function NetworksService() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Get a list of supported networks
             */
            NetworksService.prototype.getSupported = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var requestParams;
                    return __generator(this, function (_a) {
                        requestParams = {
                            method: 'GET',
                            url: baseUrl + "/v0/networks"
                        };
                        return [2 /*return*/, this.executeRequest(requestParams)];
                    });
                });
            };
            ;
            return NetworksService;
        }(api_service_1.ApiService));
        Api.NetworksService = NetworksService;
        var NotificationsService = /** @class */ (function (_super) {
            __extends(NotificationsService, _super);
            function NotificationsService() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Get active notifications for an account
             */
            NotificationsService.prototype.get = function (params) {
                return __awaiter(this, void 0, void 0, function () {
                    var requestParams;
                    return __generator(this, function (_a) {
                        requestParams = {
                            method: 'GET',
                            url: baseUrl + "/v0/notifications"
                        };
                        requestParams.queryParameters = {
                            account: params.account,
                        };
                        return [2 /*return*/, this.executeRequest(requestParams)];
                    });
                });
            };
            ;
            return NotificationsService;
        }(api_service_1.ApiService));
        Api.NotificationsService = NotificationsService;
        var OrdersService = /** @class */ (function (_super) {
            __extends(OrdersService, _super);
            function OrdersService() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Get list of orders
             */
            OrdersService.prototype.get = function (params) {
                return __awaiter(this, void 0, void 0, function () {
                    var requestParams;
                    return __generator(this, function (_a) {
                        requestParams = {
                            method: 'GET',
                            url: baseUrl + "/v0/orders"
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
                        return [2 /*return*/, this.executeRequest(requestParams)];
                    });
                });
            };
            ;
            /**
             * Create an order
             */
            OrdersService.prototype.create = function (params) {
                return __awaiter(this, void 0, void 0, function () {
                    var requestParams;
                    return __generator(this, function (_a) {
                        requestParams = {
                            method: 'POST',
                            url: baseUrl + "/v0/orders"
                        };
                        requestParams.body = params.request;
                        return [2 /*return*/, this.executeRequest(requestParams)];
                    });
                });
            };
            ;
            /**
             * Get the order(s) representing the best market price
             */
            OrdersService.prototype.getBest = function (params) {
                return __awaiter(this, void 0, void 0, function () {
                    var requestParams;
                    return __generator(this, function (_a) {
                        requestParams = {
                            method: 'GET',
                            url: baseUrl + "/v0/orders/best"
                        };
                        requestParams.queryParameters = {
                            makerTokenAddress: params.makerTokenAddress,
                            takerTokenAddress: params.takerTokenAddress,
                            baseTokenAddress: params.baseTokenAddress,
                            quantity: params.quantity,
                            networkId: params.networkId,
                            takerAddress: params.takerAddress,
                        };
                        return [2 /*return*/, this.executeRequest(requestParams)];
                    });
                });
            };
            ;
            return OrdersService;
        }(api_service_1.ApiService));
        Api.OrdersService = OrdersService;
        var ReportsService = /** @class */ (function (_super) {
            __extends(ReportsService, _super);
            function ReportsService() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Get historical data for order book
             */
            ReportsService.prototype.getHistorical = function (params) {
                return __awaiter(this, void 0, void 0, function () {
                    var requestParams;
                    return __generator(this, function (_a) {
                        requestParams = {
                            method: 'GET',
                            url: baseUrl + "/v0/reports/historical"
                        };
                        requestParams.queryParameters = {
                            networkId: params.networkId,
                            makerTokenAddress: params.makerTokenAddress,
                            takerTokenAddress: params.takerTokenAddress,
                            startDate: params.startDate,
                            endDate: params.endDate,
                        };
                        return [2 /*return*/, this.executeRequest(requestParams)];
                    });
                });
            };
            ;
            return ReportsService;
        }(api_service_1.ApiService));
        Api.ReportsService = ReportsService;
        var TakerEventsService = /** @class */ (function (_super) {
            __extends(TakerEventsService, _super);
            function TakerEventsService() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Get Taker Events
             */
            TakerEventsService.prototype.getByTaker = function (params) {
                return __awaiter(this, void 0, void 0, function () {
                    var requestParams;
                    return __generator(this, function (_a) {
                        requestParams = {
                            method: 'GET',
                            url: baseUrl + "/v0/taker-events/taker"
                        };
                        requestParams.queryParameters = {
                            networkId: params.networkId,
                            taker: params.taker,
                        };
                        return [2 /*return*/, this.executeRequest(requestParams)];
                    });
                });
            };
            ;
            /**
             * Get Taker Events by token pair
             */
            TakerEventsService.prototype.getByPair = function (params) {
                return __awaiter(this, void 0, void 0, function () {
                    var requestParams;
                    return __generator(this, function (_a) {
                        requestParams = {
                            method: 'GET',
                            url: baseUrl + "/v0/taker-events/pair"
                        };
                        requestParams.queryParameters = {
                            networkId: params.networkId,
                            makerTokenAddress: params.makerTokenAddress,
                            takerTokenAddress: params.takerTokenAddress,
                        };
                        return [2 /*return*/, this.executeRequest(requestParams)];
                    });
                });
            };
            ;
            return TakerEventsService;
        }(api_service_1.ApiService));
        Api.TakerEventsService = TakerEventsService;
        var TokenPairSummariesService = /** @class */ (function (_super) {
            __extends(TokenPairSummariesService, _super);
            function TokenPairSummariesService() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Get a list of token pair summaries
             */
            TokenPairSummariesService.prototype.get = function (params) {
                return __awaiter(this, void 0, void 0, function () {
                    var requestParams;
                    return __generator(this, function (_a) {
                        requestParams = {
                            method: 'GET',
                            url: baseUrl + "/v0/token-pair-summaries/" + params.networkId
                        };
                        return [2 /*return*/, this.executeRequest(requestParams)];
                    });
                });
            };
            ;
            return TokenPairSummariesService;
        }(api_service_1.ApiService));
        Api.TokenPairSummariesService = TokenPairSummariesService;
        var TokenPairsService = /** @class */ (function (_super) {
            __extends(TokenPairsService, _super);
            function TokenPairsService() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Get a list of supported token pairs
             */
            TokenPairsService.prototype.get = function (params) {
                return __awaiter(this, void 0, void 0, function () {
                    var requestParams;
                    return __generator(this, function (_a) {
                        requestParams = {
                            method: 'GET',
                            url: baseUrl + "/v0/token-pairs/" + params.networkId
                        };
                        return [2 /*return*/, this.executeRequest(requestParams)];
                    });
                });
            };
            ;
            return TokenPairsService;
        }(api_service_1.ApiService));
        Api.TokenPairsService = TokenPairsService;
    })(Api = Aqueduct.Api || (Aqueduct.Api = {}));
    /**
     * Namespace containing socket related events
     */
    var Events;
    (function (Events) {
        /* tslint:disable */ /**
    * This file was automatically generated by json-schema-to-typescript.
    * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
    * and run json-schema-to-typescript to regenerate this file.
    */
        var SocketEvent = /** @class */ (function () {
            function SocketEvent() {
            }
            /**
             * Subscribe to this event
             * @param params Payload to submit to the server
             * @param cb Handler for event broadcasts
             */
            SocketEvent.prototype.subscribe = function (params, cb) {
                this.params = params;
                this.callback = cb;
                socket.emit('subscribe', this.getChannel(params));
                var callback = function (changeData) { return cb(changeData); };
                socket.on(this.getChannel(params), callback);
                return this;
            };
            /**
             * Dispose of an active subscription
             */
            SocketEvent.prototype.unsubscribe = function () {
                socket.off(this.getChannel(this.params), this.callback);
                socket.emit('unsubscribe', this.getChannel(this.params));
            };
            SocketEvent.prototype.getChannel = function (params) {
                var channel = this.path;
                Object.keys(params).forEach(function (k) {
                    channel = channel.replace(":" + k, params[k]);
                });
                return channel;
            };
            return SocketEvent;
        }());
        Events.SocketEvent = SocketEvent;
        /**
         * Order changes relating to a token pair
         */
        var PairOrderChange = /** @class */ (function (_super) {
            __extends(PairOrderChange, _super);
            function PairOrderChange() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.path = 'pair-order-change/:makerTokenAddress/:takerTokenAddress';
                return _this;
            }
            return PairOrderChange;
        }(SocketEvent));
        Events.PairOrderChange = PairOrderChange;
        /**
         * Order changes related to an account address
         */
        var AccountOrderChange = /** @class */ (function (_super) {
            __extends(AccountOrderChange, _super);
            function AccountOrderChange() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.path = 'account-order-change/:account';
                return _this;
            }
            return AccountOrderChange;
        }(SocketEvent));
        Events.AccountOrderChange = AccountOrderChange;
        /**
         * Notifications related to an account address
         */
        var AccountNotification = /** @class */ (function (_super) {
            __extends(AccountNotification, _super);
            function AccountNotification() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.path = 'account-notification/:account';
                return _this;
            }
            return AccountNotification;
        }(SocketEvent));
        Events.AccountNotification = AccountNotification;
        /**
         * Taker events related to a token pair
         */
        var TakerEvent = /** @class */ (function (_super) {
            __extends(TakerEvent, _super);
            function TakerEvent() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.path = 'pair-token-event/:makerTokenAddress/:takerTokenAddress';
                return _this;
            }
            return TakerEvent;
        }(SocketEvent));
        Events.TakerEvent = TakerEvent;
    })(Events = Aqueduct.Events || (Aqueduct.Events = {}));
})(Aqueduct = exports.Aqueduct || (exports.Aqueduct = {}));
//# sourceMappingURL=aqueduct.js.map