import { SCHEMA_VERSION, type Theme } from './schema'

export function migrateTheme(input: unknown): Theme {
  if (!input || typeof input !== 'object') throw new Error('Theme must be a JSON object.')
  const candidate = input as Partial<Theme>
  if (typeof candidate.schemaVersion !== 'number') throw new Error('Missing schemaVersion.')
  if (candidate.schemaVersion > SCHEMA_VERSION) {
    throw new Error(`Theme schema ${candidate.schemaVersion} is newer than supported schema ${SCHEMA_VERSION}.`)
  }
  if (candidate.schemaVersion < 1) throw new Error('Unsupported theme schema.')
  validateTheme(candidate)
  return structuredClone(candidate as Theme)
}

export function validateTheme(candidate: Partial<Theme>): asserts candidate is Theme {
  if (!candidate.metadata?.name || !candidate.metadata.version) throw new Error('Theme metadata is incomplete.')
  if (!candidate.tokens?.colors || !candidate.tokens.typography || !candidate.tokens.spacing) {
    throw new Error('Theme tokens are incomplete.')
  }
  if (!candidate.elements || typeof candidate.elements !== 'object') throw new Error('Theme elements are missing.')
  if (!candidate.responsive) throw new Error('Responsive configuration is missing.')
}
