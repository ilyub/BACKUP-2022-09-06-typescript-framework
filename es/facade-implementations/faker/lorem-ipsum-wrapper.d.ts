import type { Facade } from "@skylib/facades/es/faker";
export interface Configurable {
    /**
     * Configures plugin.
     *
     * @param config - Plugin configuration.
     */
    readonly configure: (config: Partial<Configuration>) => void;
    /**
     * Returns plugin configuration.
     *
     * @returns Plugin configuration.
     */
    readonly getConfiguration: () => Configuration;
}
export interface Configuration {
    readonly maxSentences: number;
    readonly maxWords: number;
    readonly minSentences: number;
    readonly minWords: number;
}
export declare const loremIpsumWrapper: Configurable & Facade;
//# sourceMappingURL=lorem-ipsum-wrapper.d.ts.map