"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
process.env.NTBA_FIX_319 = 'test';
var telegen_ts_1 = require("@xleddyl/telegen-ts");
var mongodb_1 = require("mongodb");
var dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var tz = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.tz.setDefault('Europe/Rome');
try {
    require('dotenv').config();
}
catch (e) {
    // do nothing
}
var _telegramtoken = process.env.TELEGRAM_TOKEN || '';
var _mongo = process.env.MONGO || '';
var _bot = new telegen_ts_1.TelegenTS(_telegramtoken);
var _mongoClient = new mongodb_1.MongoClient(_mongo);
module.exports = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var update, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                update = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, _mongoClient.connect()];
            case 2:
                _a.sent();
                if (!update.message) return [3 /*break*/, 4];
                return [4 /*yield*/, messageHandler(update.message, update)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, _mongoClient.close()];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 7];
            case 7:
                res.send();
                return [2 /*return*/];
        }
    });
}); };
/** FUNCTIONS */
function messageHandler(message, update) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!message.entities) return [3 /*break*/, 2];
                    return [4 /*yield*/, parseEntities(message, message.entities)
                        // placeholder
                    ];
                case 1: return [2 /*return*/, _a.sent()
                    // placeholder
                ];
                case 2: 
                // placeholder
                return [4 /*yield*/, _bot.sendMessage("\uD83E\uDDD9\uD83C\uDFFC\u200D\u2642\uFE0F", message.chat.id, {
                        reply_to_message_id: message.message_id,
                    })];
                case 3:
                    // placeholder
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function parseEntities(message, entities) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _i, entities_1, entity, user, collection, payload, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, entities_1 = entities;
                    _b.label = 1;
                case 1:
                    if (!(_i < entities_1.length)) return [3 /*break*/, 11];
                    entity = entities_1[_i];
                    if (!(entity.type === 'bot_command')) return [3 /*break*/, 10];
                    if (!(message.text === '/start')) return [3 /*break*/, 8];
                    user = message.from;
                    collection = _mongoClient.db('xleddybot').collection('users');
                    if (!!user) return [3 /*break*/, 2];
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, collection.findOne({ id: user.id })];
                case 3:
                    if (!_b.sent()) return [3 /*break*/, 4];
                    collection.replaceOne({ id: user.id }, user);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, collection.insertOne(user)];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: return [4 /*yield*/, _bot.sendMessage("welcome, ".concat(user.first_name, " \uD83E\uDDD9\uD83C\uDFFC\u200D\u2642\uFE0F"), message.chat.id)];
                case 7:
                    _b.sent();
                    return [2 /*return*/];
                case 8:
                    if (!((_a = message.text) === null || _a === void 0 ? void 0 : _a.startsWith('/gtt '))) return [3 /*break*/, 10];
                    payload = message.text.replace('/gtt ', '');
                    result = convertGttDate(payload);
                    return [4 /*yield*/, _bot.sendMessage(result, message.chat.id, { parse_mode: 'MarkdownV2' })];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 1];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function convertGttDate(payload) {
    var datePattern = 'YYYY-MM-DD HH:mm';
    var gttEpoch = 1104541200;
    var hexRegexp = /[0-9A-Fa-f]{6}/g;
    if (payload === 'info')
        return "".concat(datePattern, "\nor\n6 digits HEX number");
    if (payload === 'now')
        return "`".concat(Math.floor((dayjs(dayjs.tz(undefined).format(datePattern), datePattern).unix() - gttEpoch) / 60).toString(16).toUpperCase(), "`");
    if (payload.match(hexRegexp))
        return "`".concat(dayjs.unix(parseInt(payload, 16) * 60 + gttEpoch).format(datePattern), "`");
    else
        return "`".concat(Math.floor((dayjs(payload, datePattern).unix() - gttEpoch) / 60).toString(16).toUpperCase(), "`");
}
