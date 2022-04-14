import type {
  Process as ProcessInterface,
  Facade
} from "@skylib/facades/dist/progressReporter";
import * as num from "@skylib/functions/dist/number";
import * as o from "@skylib/functions/dist/object";
import * as programFlow from "@skylib/functions/dist/programFlow";
import type { numberU } from "@skylib/functions/dist/types/core";
import $ from "jquery";

export const facade: Facade = {
  getProgress() {
    return num.round(progress, moduleConfig.precision);
  },
  reset() {
    lastEasingUpdate = 0;
    processesPool.clear();
    progress = 0;
    programFlow.clearTimeout(timeout);
    $(moduleConfig.selector)
      .removeClass(moduleConfig.activeClass)
      .css("width", "");
  },
  spawn() {
    return new Process();
  }
};

export class Process implements ProcessInterface {
  /**
   * Creates class instance.
   */
  public constructor() {
    processesPool.set(this.id, this);
    Process.update();
  }

  public done(): this {
    this.state = "done";
    this.progress = 1;
    Process.update();

    return this;
  }

  public setAuto(expectedDuration: number): this {
    this.state = "auto";
    this.expectedDuration = expectedDuration;
    this.lastAutoGrow = Date.now();
    Process.update();

    return this;
  }

  public setProgress(value: number): this {
    this.state = "manual";
    this.progress = value;
    Process.update();

    return this;
  }

  public setWeight(value: number): this {
    this.weight = value;
    Process.update();

    return this;
  }

  /**
   * Updates progress bar state.
   *
   * @param this - This argument.
   */
  protected static update(this: void): void {
    const now = Date.now();

    let count = 0;

    let total = 0;

    let anyOverdue = false;

    let anyUnfinished = false;

    for (const staged of processesPool.values()) {
      count += staged.weight;
      total += staged.weight * staged.progress;

      if (moduleConfig.enabled && now >= staged.created + moduleConfig.latency)
        anyOverdue = true;

      switch (staged.state) {
        case "auto":
          anyUnfinished = true;

          {
            const exp = Math.exp(
              (staged.lastAutoGrow - now) / staged.expectedDuration
            );

            staged.progress += (1 - staged.progress) * (1 - exp);
            staged.lastAutoGrow = now;
          }

          break;

        case "manual":
          anyUnfinished = true;

          break;

        case "done":
      }
    }

    if (anyOverdue) {
      if (anyUnfinished) progress = total / count;
      else if (progress && moduleConfig.finalEasing) {
        if (lastEasingUpdate)
          progress += (now - lastEasingUpdate) / moduleConfig.finalEasingSpeed;

        lastEasingUpdate = now;

        if (progress > 1) facade.reset();
      } else facade.reset();

      if (progress)
        $(moduleConfig.selector)
          .addClass(moduleConfig.activeClass)
          .css("width", `${100 * facade.getProgress()}%`);
    } else if (anyUnfinished) {
      // Keep waiting
    } else facade.reset();

    if (processesPool.size) {
      programFlow.clearTimeout(timeout);
      timeout = programFlow.setTimeout(
        Process.update,
        moduleConfig.updateInterval
      );
    }
  }

  protected readonly created = Date.now();

  // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
  protected expectedDuration = 0;

  protected readonly id = Symbol("ProgressiveProcessId");

  // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
  protected lastAutoGrow = Date.now();

  // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
  protected progress = 0;

  // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
  protected state: State = "manual";

  // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
  protected weight = 1;
}

export interface Configuration {
  readonly activeClass: string;
  readonly enabled: boolean;
  readonly finalEasing: boolean;
  readonly finalEasingSpeed: number;
  readonly latency: number;
  readonly precision: number;
  readonly selector: string;
  readonly updateInterval: number;
}

export type State = "auto" | "done" | "manual";

/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
export function configure(config: Partial<Configuration>): void {
  o.assign(moduleConfig, config);
}

/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export function getConfiguration(): Configuration {
  return moduleConfig;
}

let lastEasingUpdate = 0;

const moduleConfig: Configuration = {
  activeClass: "progress-bar-active",
  enabled: false,
  finalEasing: false,
  finalEasingSpeed: 500,
  latency: 0,
  precision: 3,
  selector: "#progressBar",
  updateInterval: 100
};

const processesPool = new Map<symbol, Process>();

let progress = 0;

let timeout: numberU;
