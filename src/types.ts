export const DEFAULT_ENTITY_TYPES = ["grid", "solar", "battery", "home", "ev"] as const;
export type IntegrationType = "tesla" | "octopus" | "manual";
export type DefaultEntityType = (typeof DEFAULT_ENTITY_TYPES)[number];
export const CUSTOM_TYPE_PREFIX = "custom_";
export const MAX_CUSTOM_TYPES = 4;
export type EntityRef = string | string[];

export interface OctopusConfig {
  rate_entity?: string;        // current rate sensor (p/kWh or similar)
  cost_entity?: string;        // accumulated cost today
  slots_entity?: string;       // entity with upcoming rates in attributes
  dispatches_entity?: string;  // binary_sensor with planned_dispatches attribute
}

export interface EntityTypeConfig {
  power_import?: EntityRef;
  power_export?: EntityRef;
  power_combined?: EntityRef;
  import_power?: EntityRef;
  export_power?: EntityRef;
  combined_power?: EntityRef;
  daily_usage?: EntityRef;
  daily_export?: string;
  export_rate?: string;
  soc?: string;
  icon?: string;
  label?: string;
  show_label?: boolean;
  colour?: string;
  show_zero?: boolean;
  zero_tolerance?: number;
  reverse_power_flow?: boolean;
  subtract_from_home?: boolean;
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
  title?: string;
  show_header?: boolean;
  show_header_values?: boolean;
  dynamic_custom_placement?: boolean;
  ev_subtract_from_home?: boolean;
  tariff_entity?: string;
  entity_types?: Record<string, EntityTypeConfig>;
  custom_types?: EntityTypeConfig[];
  live_data?: LiveDataConfig;
  system?: SystemConfig;
  display?: DisplayConfig;
}

function customTypeSortKey(key: string): number {
  const match = key.match(/^custom_(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

export function customTypeKey(index: number): string {
  return `${CUSTOM_TYPE_PREFIX}${index + 1}`;
}

function normalizeMultiEntityRef(value?: EntityRef): string[] | undefined {
  if (Array.isArray(value)) {
    const normalized = value.map((id) => (typeof id === "string" ? id.trim() : ""));
    return normalized.length ? normalized : undefined;
  }
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return undefined;
}

function normalizeCustomEntityType(config: EntityTypeConfig): EntityTypeConfig {
  const importPower = normalizeMultiEntityRef(config.import_power ?? config.power_import);
  const exportPower = normalizeMultiEntityRef(config.export_power ?? config.power_export);
  const combinedPower = normalizeMultiEntityRef(config.combined_power ?? config.power_combined);

  return {
    ...config,
    power_import: undefined,
    power_export: undefined,
    power_combined: undefined,
    import_power: importPower,
    export_power: exportPower,
    combined_power: combinedPower,
    daily_usage: normalizeMultiEntityRef(config.daily_usage),
  };
}

export function normalizeCardConfig(config: CardConfig): CardConfig {
  const entityTypes = config.entity_types ?? {};
  const defaultEntityTypes = Object.fromEntries(
    Object.entries(entityTypes).filter(([key]) =>
      (DEFAULT_ENTITY_TYPES as readonly string[]).includes(key),
    ),
  );

  const legacyCustomTypes = Object.entries(entityTypes)
    .filter(([key]) => !(DEFAULT_ENTITY_TYPES as readonly string[]).includes(key))
    .sort(([a], [b]) => customTypeSortKey(a) - customTypeSortKey(b))
    .map(([, value]) => normalizeCustomEntityType({ ...value }));

  const customTypes = Array.isArray(config.custom_types)
    ? config.custom_types.map((value) => normalizeCustomEntityType({ ...value }))
    : legacyCustomTypes;

  const normalizedEntityTypes: Record<string, EntityTypeConfig> = {
    ...defaultEntityTypes,
  };

  customTypes.forEach((value, index) => {
    normalizedEntityTypes[customTypeKey(index)] = { ...value };
  });

  return {
    ...config,
    entity_types: normalizedEntityTypes,
    custom_types: customTypes,
  };
}
