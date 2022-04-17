import type { faker } from "@skylib/facades";
export declare const loremIpsumWrapper: Configurable & faker.Facade;
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
//# sourceMappingURL=lorem-ipsum-wrapper.d.ts.map