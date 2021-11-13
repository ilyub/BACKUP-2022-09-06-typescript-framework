import $ from "jquery";

import type {
  Facade,
  Process as ProcessInterface
} from "@skylib/facades/dist/progressReporter";
import * as num from "@skylib/functions/dist/number";
import * as o from "@skylib/functions/dist/object";
import * as timer from "@skylib/functions/dist/timer";
import type { Timeout } from "@skylib/functions/dist/types/core";

export interface Configuration {
  readonly enabled: boolean;
  readonly finalEasing: boolean;
  readonly finalEasingSpeed: number;
  readonly latency: number;
  readonly precision: number;
  readonly selector: string;
  readonly updateInterval: number;
}

export type PartialConfiguration<K extends keyof Configuration> = {
  readonly [L in K]: Configuration[L];
};

export type State = "manual" | "auto" | "done";

/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
export function configure<K extends keyof Configuration>(
  config: PartialConfiguration<K>
): void {
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

export const implementation: Facade = {
  getProgress() {
    return num.round(progress, moduleConfig.precision);
  },
  reset() {
    lastEasingUpdate = 0;
    processesPool.clear();
    progress = 0;
    timer.removeTimeout(timeout);
    $(moduleConfig.selector).removeClass("x-active").css("width", "");
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

  public done(): Process {
    this.state = "done";
    this.progress = 1;
    Process.update();

    return this;
  }

  public setAuto(expectedDuration: number): Process {
    this.state = "auto";
    this.expectedDuration = expectedDuration;
    this.lastAutoGrow = Date.now();
    Process.update();

    return this;
  }

  public setProgress(value: number): Process {
    this.state = "manual";
    this.progress = value;
    Process.update();

    return this;
  }

  public setWeight(value: number): Process {
    this.weight = value;
    Process.update();

    return this;
  }

  /*
  |*****************************************************************************
  |* Protected
  |*****************************************************************************
  |*/

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

        if (progress > 1) implementation.reset();
      } else implementation.reset();

      if (progress)
        $(moduleConfig.selector)
          .addClass("x-active")
          .css("width", `${100 * implementation.getProgress()}%`);
    } else if (anyUnfinished) {
      // Keep waiting
    } else implementation.reset();

    if (processesPool.size) {
      timer.removeTimeout(timeout);
      timeout = timer.addTimeout(Process.update, moduleConfig.updateInterval);
    }
  }

  protected created = Date.now();

  protected expectedDuration = 0;

  protected id = Symbol("ProgressiveProcessId");

  protected lastAutoGrow = Date.now();

  protected progress = 0;

  protected state: State = "manual";

  protected weight = 1;
}

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

let lastEasingUpdate = 0;

const moduleConfig: Configuration = {
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

let timeout: Timeout | undefined = undefined;
