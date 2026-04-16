export const DEFAULT_ENTITY_TYPES = ["grid", "solar", "battery", "home", "ev"] as const;
export type IntegrationType = "tesla" | "octopus" | "manual";
export type DefaultEntityType = (typeof DEFAULT_ENTITY_TYPES)[number];

export interface OctopusConfig {
  rate_entity?: string;        // current rate sensor (p/kWh or similar)
  cost_entity?: string;        // accumulated cost today
  slots_entity?: string;       // entity with upcoming rates in attributes
  dispatches_entity?: string;  // binary_sensor with planned_dispatches attribute
}

export interface EntityTypeConfig {
  power_import?: string;
  power_export?: string;
  power_combined?: string;
  daily_usage?: string;
  daily_export?: string;
  soc?: string;
  label?: string;
  colour?: string;
  show_zero?: boolean;
  zero_tolerance?: number;
  octopus?: OctopusConfig;
}

export interface LiveDataConfig {
  refresh_interval?: number;
  show_live_badge?: boolean;
}

export interface SystemConfig {
  energy_date_reset?: number;
  time_format?: "12h" | "24h";
}

export interface DisplayConfig {
  decimal_places?: number;
  unit?: "W" | "kW" | "auto";
  animation?: boolean;
  dynamic_animation_speed?: boolean;
}

export interface CardConfig {
  type: string;
  integration_type?: IntegrationType;
  device?: string;
  title?: string;
  show_header?: boolean;
  tariff_entity?: string;
  entity_types?: Record<string, EntityTypeConfig>;
  live_data?: LiveDataConfig;
  system?: SystemConfig;
  display?: DisplayConfig;
}
