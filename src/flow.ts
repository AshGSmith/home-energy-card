// Shared types and flow-computation logic.
// Kept separate to avoid circular imports between flow-layout ↔ node-detail.

import type { EntityTypeConfig } from "./types.js";

export interface HomeAssistant {
  states: Record<string, {
    state: string;
    attributes: Record<string, unknown>;
  }>;
  callApi<T>(method: "GET" | "POST", path: string): Promise<T>;
}

export type FlowDirection = "to-home" | "from-home" | "idle";

export interface FlowInfo {
  /** Net signed watts. grid: +import/−export. battery/ev: +charging/−discharging. */
  power: number | null;
  /** Absolute watts after zero_tolerance; null when idle. */
  magnitude: number | null;
  direction: FlowDirection;
}

export function readNum(
  states: HomeAssistant["states"],
  entityId?: string,
): number | null {
  if (!entityId) return null;
  const s = states[entityId]?.state;
  if (!s || s === "unavailable" || s === "unknown") return null;
  const v = parseFloat(s);
  return isNaN(v) ? null : v;
}

/**
 * Derive net power and flow direction for a node.
 *
 * Sign conventions:
 *   solar   — always to-home
 *   grid    — +import (grid→home) / −export (home→grid)
 *   battery — +charging (home→battery) / −discharging (battery→home)
 *   ev      — +charging (home→ev) / −V2H (ev→home)
 *   custom  — +from-home / −to-home
 *
 * When both power_import and power_export are set: net = import − export.
 * Missing side treated as 0 when the other side has data.
 */
export function computeFlowInfo(
  type: string,
  cfg: Pick<EntityTypeConfig, "power_combined" | "power_import" | "power_export" | "zero_tolerance">,
  states: HomeAssistant["states"],
): FlowInfo {
  const tol = cfg.zero_tolerance ?? 0;
  const IDLE: FlowInfo = { power: null, magnitude: null, direction: "idle" };

  let net: number | null;

  if (cfg.power_combined) {
    net = readNum(states, cfg.power_combined);
  } else {
    const hasImp = Boolean(cfg.power_import);
    const hasExp = Boolean(cfg.power_export);
    if (!hasImp && !hasExp) return IDLE;

    const imp = hasImp ? readNum(states, cfg.power_import) : null;
    const exp = hasExp ? readNum(states, cfg.power_export) : null;

    if ((hasImp ? imp === null : true) && (hasExp ? exp === null : true)) return IDLE;
    net = (imp ?? 0) - (exp ?? 0);
  }

  if (net === null) return IDLE;
  if (Math.abs(net) <= tol) return { power: net, magnitude: null, direction: "idle" };

  const magnitude = Math.abs(net);
  let direction: FlowDirection;

  switch (type) {
    case "solar":   direction = "to-home"; break;
    case "grid":    direction = net > 0 ? "to-home"   : "from-home"; break;
    case "battery":
    case "ev":      direction = net > 0 ? "from-home" : "to-home";   break;
    default:        direction = net > 0 ? "from-home" : "to-home";
  }

  return { power: net, magnitude, direction };
}
