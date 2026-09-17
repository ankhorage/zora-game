import type React from 'react';

type GameOverlayCornerPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type GamePointerEvents = 'auto' | 'box-none' | 'box-only' | 'none';
export type GameOverlayPlacement =
  'fill' | 'center' | 'top' | 'bottom' | GameOverlayCornerPlacement;

export interface GameFieldProps {
  readonly children?: React.ReactNode;
  readonly aspectRatio?: number;
  readonly minHeight?: number;
  readonly clip?: boolean;
  readonly accessibilityLabel?: string;
  readonly testID?: string;
}

export interface GameEntityProps {
  readonly children?: React.ReactNode;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly opacity?: number;
  readonly scale?: number;
  readonly rotation?: number;
  readonly zIndex?: number;
  readonly hidden?: boolean;
  readonly pointerEvents?: GamePointerEvents;
  readonly accessibilityLabel?: string;
  readonly testID?: string;
}

export interface GameOverlayProps {
  readonly children?: React.ReactNode;
  readonly placement?: GameOverlayPlacement;
  readonly blocking?: boolean;
  readonly padding?: number;
  readonly accessibilityLabel?: string;
  readonly testID?: string;
}
