"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const websockets_1 = require("@nestjs/websockets");
let EventsGateway = class EventsGateway {
    constructor() { }
    handleConnection(client, socket) {
        client.on("message", (data) => __awaiter(this, void 0, void 0, function* () { }));
    }
    onMessage(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], EventsGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage("message"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "onMessage", null);
EventsGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [])
], EventsGateway);
exports.EventsGateway = EventsGateway;
//# sourceMappingURL=socket.js.map