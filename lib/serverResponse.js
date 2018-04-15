"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 0] = "SUCCESS";
    ResponseStatus[ResponseStatus["ERROR"] = 1] = "ERROR";
    ResponseStatus[ResponseStatus["NEED_LOGIN"] = 10] = "NEED_LOGIN";
    ResponseStatus[ResponseStatus["MISS_ARG"] = 20] = "MISS_ARG";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
var ResponseErrorText;
(function (ResponseErrorText) {
    ResponseErrorText["ERROR"] = "\u8BF7\u6C42\u9519\u8BEF";
    ResponseErrorText["NEED_LOGIN"] = "\u9700\u8981\u767B\u5F55";
    ResponseErrorText["MISS_ARG"] = "\u7F3A\u5C11\u53C2\u6570";
})(ResponseErrorText = exports.ResponseErrorText || (exports.ResponseErrorText = {}));
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
exports.createSuccess = (option) => {
    return new ServerResponse(option);
};
exports.createSuccessByMsg = (msg) => {
    return exports.createSuccess({
        status: ResponseStatus.SUCCESS,
        msg,
    });
};
exports.createSuccessByStatus = (status) => {
    return exports.createSuccess({
        status
    });
};
exports.createSuccessByData = (data) => {
    return exports.createSuccess({
        status: ResponseStatus.SUCCESS,
        data,
    });
};
exports.createError = () => {
    return new ServerResponse({ status: ResponseStatus.ERROR, msg: ResponseErrorText.ERROR });
};
exports.createErrorByMessage = (msg) => {
    return new ServerResponse({ status: ResponseStatus.ERROR, msg });
};
exports.createErrorByStatusMessage = (status, msg) => {
    return new ServerResponse({ status, msg });
};
exports.createLoginError = () => {
    return exports.createErrorByStatusMessage(ResponseStatus.NEED_LOGIN, ResponseErrorText.NEED_LOGIN);
};
