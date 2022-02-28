import type { Facade } from "@skylib/facades/es/faker";
export interface Configurable {
    /**
     * Configures plugin.
     *
     * @param config - Plugin configuration.
     */
    readonly configure: <K extends keyof Configuration>(config: PartialConfiguration<K>) => void;
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
export declare type PartialConfiguration<K extends keyof Configuration> = {
    readonly [L in K]: Configuration[L];
};
export declare const loremIpsumWrapper: Configurable & Facade;
//# sourceMappingURL=lorem-ipsum-wrapper.d.ts.map