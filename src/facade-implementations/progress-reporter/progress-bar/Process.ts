import { finalEasing, growProgress, moduleConfig } from "./core";
import { a, num, programFlow, set } from "@skylib/functions";
import $ from "jquery";
import type { ProcessState } from "./core";
import type { progressReporter } from "@skylib/facades";
import type { Writable, numberU } from "@skylib/functions";

export class Process implements progressReporter.Process {
  /**
   * Returns progress.
   *
   * @returns Progress.
   */
  public static readonly getProgress = (): number =>
    num.round(progress, moduleConfig.precision);

  /**
   * Resets to initial state.
   */
  public static readonly reset = (): void => {
    if (processes.size) {
      processes = new Set();
      progress = 0;
      programFlow.clearTimeout(timeout);
      $(moduleConfig.selector)
        .removeClass(moduleConfig.activeClass)
        .css("width", "");
    }
  };

  /**
   * Creates class instance.
   */
  public constructor() {
    processes = set.add(processes, this);
    Process.update();
  }

  public done(): this {
    this.state.state = "finalEasing";
    this.state.lastUpdate = Date.now();
    Process.update();

    return this;
  }

  public setAuto(expectedDuration: number): this {
    this.state.state = "auto";
    this.state.expectedDuration = expectedDuration;
    this.state.lastUpdate = Date.now();
    Process.update();

    return this;
  }

  public setProgress(value: number): this {
    this.state.state = "manual";
    this.state.progress = value;
    Process.update();

    return this;
  }

  public setWeight(value: number): this {
    this.state.weight = value;
    Process.update();

    return this;
  }

  /**
   * Updates progress bar state.
   */
  protected static readonly update = (): void => {
    if (moduleConfig.enabled) {
      const now = Date.now();

      const all = a.fromIterable(processes);

      for (const p of all) p.update();

      const count = num.sum(...all.map(p => p.state.weight));

      const total = num.sum(...all.map(p => p.state.weight * p.state.progress));

      const overdue = all.some(p => now >= p.created + moduleConfig.latency);

      const unfinished = all.some(p => p.state.state !== "done");

      if (unfinished) {
        if (overdue) {
          progress = total / count;
          $(moduleConfig.selector)
            .addClass(moduleConfig.activeClass)
            .css("width", `${100 * Process.getProgress()}%`);
        }

        programFlow.clearTimeout(timeout);
        timeout = programFlow.setTimeout(
          Process.update,
          moduleConfig.updateInterval
        );
      } else Process.reset();
    } else Process.reset();
  };

  protected readonly created = Date.now();

  protected readonly state: Writable<ProcessState> = {
    expectedDuration: 0,
    lastUpdate: Date.now(),
    progress: 0,
    state: "manual",
    weight: 1
  };

  /**
   * Updates internal state.
   */
  protected update(): void {
    switch (this.state.state) {
      case "auto":
        growProgress(this.state);

        break;

      case "finalEasing":
        finalEasing(this.state);

        break;

      default:
    }
  }
}

let processes: ReadonlySet<Process> = new Set();

let progress = 0;

let timeout: numberU;
