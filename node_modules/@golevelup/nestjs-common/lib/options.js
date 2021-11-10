"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function createAsyncOptionsProvider(provide, options) {
    if (options.useFactory) {
        return {
            provide,
            useFactory: options.useFactory,
            inject: options.inject || []
        };
    }
    return {
        provide,
        useFactory: async (optionsFactory) => {
            return optionsFactory.createOptions();
        },
        inject: [
            options.useClass ||
                lodash_1.get(options, 'useExisting.provide', options.useExisting.value.constructor.name)
        ]
    };
}
exports.createAsyncOptionsProvider = createAsyncOptionsProvider;
//# sourceMappingURL=options.js.map