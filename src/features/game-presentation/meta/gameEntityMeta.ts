import type { ZoraComponentMeta } from '@ankhorage/zora/metadata';

/*** Describe one positioned generic game entity for ZORA authoring tools. */
export const gameEntityMeta = {
  name: 'GameEntity',
  category: 'component',
  description: 'Positions arbitrary visual content inside a GameField without owning game rules.',
  directManifestNode: true,
  allowedChildren: ['Badge', 'Icon', 'Image', 'Text', 'View'],
  blueprint: {
    label: 'Game entity',
    defaultProps: { x: 0, y: 0, opacity: 1, scale: 1, rotation: 0, zIndex: 0 },
  },
  props: {
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
      label: 'Width',
      authoring: { authority: 'instance' },
    },
    height: {
      type: 'number',
      category: 'Size',
      label: 'Height',
      authoring: { authority: 'instance' },
    },
    opacity: {
      type: 'number',
      category: 'Appearance',
      label: 'Opacity',
      default: 1,
      authoring: { authority: 'instance' },
    },
    scale: {
      type: 'number',
      category: 'Transform',
      label: 'Scale',
      default: 1,
      authoring: { authority: 'instance' },
    },
    rotation: {
      type: 'number',
      category: 'Transform',
      label: 'Rotation',
      default: 0,
      authoring: { authority: 'instance' },
    },
    zIndex: {
      type: 'number',
      category: 'Position',
      label: 'Z index',
      default: 0,
      authoring: { authority: 'instance' },
    },
    hidden: {
      type: 'boolean',
      category: 'State',
      label: 'Hidden',
      default: false,
      authoring: { authority: 'instance' },
    },
    pointerEvents: {
      type: 'enum',
      category: 'Interaction',
      label: 'Pointer events',
      enum: ['auto', 'box-none', 'box-only', 'none'],
      default: 'auto',
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
