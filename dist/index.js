"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const Logger_1 = __importDefault(require("./core/Logger"));
app_1.default
    .listen(config_1.port, () => {
    Logger_1.default.info(`Server running on port: ${config_1.port}`);
})
    .on('error', (e) => Logger_1.default.error(e));
//# sourceMappingURL=index.js.map