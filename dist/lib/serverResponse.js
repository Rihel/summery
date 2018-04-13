"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 0] = "SUCCESS";
    ResponseStatus[ResponseStatus["ERROR"] = 1] = "ERROR";
    ResponseStatus[ResponseStatus["NEED_LOGIN"] = 10] = "NEED_LOGIN";
    ResponseStatus[ResponseStatus["MISS_ARG"] = 20] = "MISS_ARG";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
class ServerResponse {
    constructor({ msg, status, data }) {
        this.status = status;
        this.msg = msg;
        this.data = data;
        for (const key in this) {
            const value = this[key];
            if (value == undefined) {
                delete this[key];
            }
        }
    }
}
exports.createSuccess = () => {
    return new ServerResponse({ status: ResponseStatus.SUCCESS });
};
exports.createError = () => {
    return new ServerResponse({ status: ResponseStatus.ERROR, msg: '错误' });
};
exports.createErrorByMessage = (msg) => {
    return new ServerResponse({ status: ResponseStatus.ERROR, msg });
};
exports.createErrorByStatusMessage = (status, msg) => {
    return new ServerResponse({ status, msg });
};
exports.createLoginError = () => {
    return exports.createErrorByStatusMessage(ResponseStatus.NEED_LOGIN, '需要登录！');
};
