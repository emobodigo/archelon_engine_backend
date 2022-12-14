"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logger_1 = __importDefault(require("./core/Logger"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const v1_1 = __importDefault(require("./routes/v1"));
const ApiError_1 = require("./core/ApiError");
process.on('uncaughtException', (e) => {
    Logger_1.default.error(e);
});
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use((0, cors_1.default)({ origin: config_1.corsURL, optionsSuccessStatus: 200 }));
// Routes
app.use('api/v1', v1_1.default);
// catch 404 and forward to error handler
app.use((_req, _res, next) => next(new ApiError_1.NotFoundError()));
// Error handler
app.use((err, _req, res, _next) => {
    if (err instanceof ApiError_1.ApiError) {
        ApiError_1.ApiError.handle(err, res);
    }
    else {
        if (config_1.environtment === 'development') {
            Logger_1.default.error(err);
            return res.status(500).send(err.message);
        }
        ApiError_1.ApiError.handle(new ApiError_1.InternalError(), res);
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map