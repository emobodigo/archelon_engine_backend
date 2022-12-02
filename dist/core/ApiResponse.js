"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRefreshResponse = exports.SuccessResponse = exports.FailureMessageResponse = exports.SuccessMessageResponse = exports.ForbiddenResponse = exports.BadRequestResponse = exports.NotFoundResponse = exports.InternalErrorResponse = exports.AccessTokenErrorResponse = exports.AuthFailureResponse = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode["SUCCESS"] = "10000";
    StatusCode["FAILURE"] = "10001";
    StatusCode["RETRY"] = "10002";
    StatusCode["INVALID_ACCESS_TOKEN"] = "10003";
})(StatusCode || (StatusCode = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatus[ResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(ResponseStatus || (ResponseStatus = {}));
class ApiResponse {
    constructor(statusCode, status, message) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
    prepare(res, response) {
        return res.status(this.status).json(ApiResponse.sanitize(response));
    }
    send(res) {
        return this.prepare(res, this);
    }
    static sanitize(response) {
        const clone = {};
        Object.assign(clone, response);
        // @ts-ignore
        delete clone.status;
        for (const i in clone) {
            if (typeof clone[i] === 'undefined') {
                delete clone[i];
            }
        }
        return clone;
    }
}
class AuthFailureResponse extends ApiResponse {
    constructor(message = 'Authentication Failure') {
        super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
    }
}
exports.AuthFailureResponse = AuthFailureResponse;
class AccessTokenErrorResponse extends ApiResponse {
    constructor(message = 'Access token invalid') {
        super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message);
        this.instruction = 'refresh_token';
    }
    send(res) {
        res.setHeader('instruction', this.instruction);
        return super.prepare(res, this);
    }
}
exports.AccessTokenErrorResponse = AccessTokenErrorResponse;
class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error') {
        super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
    }
}
exports.InternalErrorResponse = InternalErrorResponse;
class NotFoundResponse extends ApiResponse {
    constructor(message = 'Not Found') {
        super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
    }
    send(res) {
        var _a;
        this.url = (_a = res.req) === null || _a === void 0 ? void 0 : _a.originalUrl;
        return this.prepare(res, this);
    }
}
exports.NotFoundResponse = NotFoundResponse;
class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Request') {
        super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
    }
}
exports.BadRequestResponse = BadRequestResponse;
class ForbiddenResponse extends ApiResponse {
    constructor(message = 'Forbidden') {
        super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
    }
}
exports.ForbiddenResponse = ForbiddenResponse;
class SuccessMessageResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
    }
}
exports.SuccessMessageResponse = SuccessMessageResponse;
class FailureMessageResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
    }
}
exports.FailureMessageResponse = FailureMessageResponse;
class SuccessResponse extends ApiResponse {
    constructor(message, data) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
        this.data = data;
    }
    send(res) {
        return this.prepare(res, this);
    }
}
exports.SuccessResponse = SuccessResponse;
class TokenRefreshResponse extends ApiResponse {
    constructor(message, accessToken, refreshToken) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    send(res) {
        return this.prepare(res, this);
    }
}
exports.TokenRefreshResponse = TokenRefreshResponse;
//# sourceMappingURL=ApiResponse.js.map