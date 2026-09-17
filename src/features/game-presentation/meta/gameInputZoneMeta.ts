import type { ZoraComponentMeta } from '@ankhorage/zora/metadata';

/*** Describe a field-relative pointer/touch input adapter for one embeddable Game session. */
export const gameInputZoneMeta = {
  name: 'GameInputZone',
  category: 'component',
  description:
    'Normalizes pointer and touch positions into field-relative percentages and dispatches a generic game event.',
  directManifestNode: true,
  allowedChildren: [],
  blueprint: {
    label: 'Game input zone',
    defaultProps: {
      eventType: 'game.pointer',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      zIndex: 1,
      enabled: true,
      continuous: true,
    },
  },
  props: {
    eventType: {
      type: 'string',
      category: 'Input',
      label: 'Game event type',
      default: 'game.pointer',
      authoring: { authority: 'instance' },
    },
    entityId: {
      type: 'string',
      category: 'Input',
      label: 'Entity id',
      authoring: { authority: 'instance' },
    },
    x: {
      type: 'number',
      category: 'Position',
      label: 'X (%)',
      default: 0,
      authoring: { authority: 'instance' },
    },
    y: {
      type: 'number',
      category: 'Position',
      label: 'Y (%)',
      default: 0,
      authoring: { authority: 'instance' },
    },
    width: {
      type: 'number',
      category: 'Size',
      label: 'Width (%)',
      default: 100,
      authoring: { authority: 'instance' },
    },
    height: {
      type: 'number',
      category: 'Size',
      label: 'Height (%)',
      default: 100,
      authoring: { authority: 'instance' },
    },
    zIndex: {
      type: 'number',
      category: 'Position',
      label: 'Z index',
      default: 1,
      authoring: { authority: 'instance' },
    },
    enabled: {
      type: 'boolean',
      category: 'State',
      label: 'Enabled',
      default: true,
      authoring: { authority: 'instance' },
    },
    continuous: {
      type: 'boolean',
      category: 'Input',
      label: 'Dispatch while moving',
      default: true,
      authoring: { authority: 'instance' },
    },
    accessibilityLabel: {
      type: 'string',
      category: 'Accessibility',
      label: 'Accessibility label',
      authoring: { authority: 'instance' },
    },
  },
} as const satisfies ZoraComponentMeta;
