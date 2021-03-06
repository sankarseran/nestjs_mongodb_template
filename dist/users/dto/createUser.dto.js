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
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require(".././schemas/user.schema");
class CreateUserDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "first_name", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "last_name", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: user_schema_1.role.USER + " || " + user_schema_1.role.ADMIN + " || " + user_schema_1.role.SUPER_ADMIN }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: "2019-05-23T10:02:23.059Z" }),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "created_date_time", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=createUser.dto.js.map