import {
    Controller,
    Get,
    Response,
    HttpStatus,
    Param,
    Body,
    Post,
    Request,
    Patch,
    Delete
} from "@nestjs/common";
import { ApiUseTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { ChangePasswordDto } from "./dto/change_password.dto";
import { ForgetPasswordDto, ForgetPasswordValidate, ForgetPasswordResetDto } from "./dto/forgetPassword.dto";
import { UsersService } from "./users.service";
import { Utility } from ".././common/utility";
import { ResMessage, CONSTANTS } from ".././common/res.message";
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from "class-validator";
import * as jwt from 'jsonwebtoken';
import * as config from "config";
import { role } from "./schemas/user.schema";


@ApiUseTags("users")
@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly utility: Utility
    ) {

    }

    @Post('register')
    public async register(
        @Response() res,
        @Request() req,
        @Body() createUserDto: CreateUserDto
    ) {
        try {
            createUserDto.created_date_time = new Date();
            const encryptedPassword: any = await this.utility.passwordEncrypt(createUserDto.password);
            createUserDto.password = encryptedPassword;
            const result = await this.usersService.create(createUserDto);
            var token = jwt.sign({ user_id: result._id }, config.jwt.secret);
            return this.utility.sendSucc(req, res, { 'token': token }, ResMessage.CREATED_SUCC);

        } catch (e) {
            return this.utility.sendErr(req, res, e);
        }
    }

    @Post('login')
    public async login(
        @Response() res,
        @Request() req,
        @Body() loginUserDto: LoginUserDto
    ) {
        try {
            const result = await this.usersService.findOne({ email: loginUserDto.email });
            if (!result) { throw { message: ResMessage.LOGIN_EMAIL_ERROR } }
            const decryptPassword: any = await this.utility.passwordMatchCheck(loginUserDto.password, result.password);
            if (!decryptPassword) { throw { message: ResMessage.LOGIN_PASSWORD_ERROR } }
            if (result.account_status === CONSTANTS.SUSPENDED) { throw { message: ResMessage.LOGIN_ACCOUNT_SUSPEND } }
            var token = jwt.sign({ user_id: result._id, role: result.role }, config.jwt.secret);
            return this.utility.sendSucc(req, res, { 'token': token }, ResMessage.LOGIN_SUCC);
        } catch (e) {
            return this.utility.sendErr(req, res, e);
        }
    }

    @Get('logOut')
    public async logOut(
        @Response() res,
        @Request() req
    ) {
        try {
            return this.utility.sendSucc(req, res, [], ResMessage.LOGOUT_SUCC);
        } catch (e) {
            return this.utility.sendErr(req, res, e);
        }
    }

    @Get('view')
    @ApiBearerAuth()
    public async view(
        @Response() res,
        @Request() req,
    ) {
        try {
            this.utility.roleBaseAccess(req.headers.user_role, [role.USER, role.ADMIN]);
            const userData = await this.usersService.findOne({ _id: req.headers.user_id });
            return this.utility.sendSucc(req, res, userData, ResMessage.LIST_SUCC);
        } catch (e) {
            return this.utility.sendErr(req, res, e);
        }
    }

    @Post('update')
    @ApiBearerAuth()
    public async update(
        @Response() res,
        @Request() req,
        @Body() updateUserDto: UpdateUserDto
    ) {
        try {

            const userData = await this.usersService.findOne({ _id: req.headers.user_id });
            userData.first_name = updateUserDto.first_name;
            userData.last_name = updateUserDto.last_name;
            userData.email = updateUserDto.email;
            var result = await userData.save();
            return this.utility.sendSucc(req, res, result, ResMessage.UPDATE_SUCC);
        } catch (e) {
            return this.utility.sendErr(req, res, e);
        }
    }

    @Post('change_password')
    @ApiBearerAuth()
    public async changePassword(
        @Response() res,
        @Request() req,
        @Body() changePasswordDto: ChangePasswordDto
    ) {
        try {

            const userData = await this.usersService.findOne({ _id: req.headers.user_id, password: changePasswordDto.old_password });
            if (userData == null) { throw { 'message': ResMessage.PASSWORD_NOT_EXISTS } }
            userData.password = changePasswordDto.new_password;
            var result = await userData.save();
            return this.utility.sendSucc(req, res, result, ResMessage.UPDATE_SUCC);
        } catch (e) {
            return this.utility.sendErr(req, res, e);
        }
    }

    @Post('forgetPassword')
    public async forgetPassword(
        @Response() res,
        @Request() req,
        @Body() forgetPasswordDto: ForgetPasswordDto
    ) {
        try {
            let forgetPasswordValidate = new ForgetPasswordValidate();
            forgetPasswordValidate.email = forgetPasswordDto.email;
            const result = await this.utility.fieldValidate(forgetPasswordValidate);
            if (result) {
                const userData = await this.usersService.findOne({ email: forgetPasswordDto.email });
                userData.forget_password_token = Math.random().toString(36).substr(2);
                var s = new Date();
                s.setMinutes(s.getMinutes() + 5);
                userData.forget_password_expried_time = s;
                await userData.save();
                if (userData == null) { throw { message: ResMessage.EMAIL_NOT_EXISTS } }
                this.utility.sendMail(
                    forgetPasswordDto.email, ResMessage.FORGET_PASSWORD, 
                    ResMessage.FORGET_PASSWORD_MAIL_CONTENT.replace('#TOKEN', userData.forget_password_token));
                return this.utility.sendSucc(req, res, forgetPasswordDto, ResMessage.FORGET_PASSWORD_CHECK_MAIL);
            } else {
                throw result;
            }
        } catch (e) {
            return this.utility.sendErr(req, res, e);
        }
    }

    @Post('resetPassword')
    public async resetPassword(
        @Response() res,
        @Request() req,
        @Body() forgetPasswordResetDto: ForgetPasswordResetDto
    ) {
        try {
            const userData = await this.usersService.findOne(
                { forget_password_token: forgetPasswordResetDto.token, forget_password_expried_time: { '$gte': new Date() } });
            if (userData == null) { throw { 'message': ResMessage.RESET_PASSWORD_EXPRIED } }
            userData.password = forgetPasswordResetDto.password;
            await userData.save();
            return this.utility.sendSucc(req, res, userData, ResMessage.RESET_PASSWORD_SUCC);
        } catch (e) {
            return this.utility.sendErr(req, res, e);
        }
    }

}
