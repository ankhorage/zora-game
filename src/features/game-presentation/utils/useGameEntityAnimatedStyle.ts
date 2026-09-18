import React from 'react';
import { Animated } from 'react-native';

import type { GameEntityMotionProps } from '../../../types/gamePresentation';
import { resolveGameEntityMotionPlan } from './resolveGameEntityMotionPlan';
import { useAnimatedGameEntityValue } from './useAnimatedGameEntityValue';
import { useGameEntityMotionProgress } from './useGameEntityMotionProgress';
import { useGameReducedMotion } from './useGameReducedMotion';

interface GameEntityAnimatedStyleInput extends GameEntityMotionProps {
  readonly x: number;
  readonly y: number;
  readonly opacity: number;
  readonly scale: number;
  readonly rotation: number;
}

/*** Compose bound GameEntity values with optional relative presentation motion. */
export function useGameEntityAnimatedStyle(input: GameEntityAnimatedStyleInput) {
  const reduceMotion = useGameReducedMotion();
  const plan = React.useMemo(
    () => resolveGameEntityMotionPlan(input, reduceMotion),
    [
      input.motionAlternate,
      input.motionDelayMs,
      input.motionDurationMs,
      input.motionEasing,
      input.motionEssential,
      input.motionOffsetX,
      input.motionOffsetY,
      input.motionOpacityDelta,
      input.motionPaused,
      input.motionRepeat,
      input.motionRotationDelta,
      input.motionScaleDelta,
      input.transitionDurationMs,
      input.transitionEasing,
      reduceMotion,
    ],
  );
  const x = useAnimatedGameEntityValue(input.x, plan.transitionDurationMs, plan.transitionEasing);
  const y = useAnimatedGameEntityValue(input.y, plan.transitionDurationMs, plan.transitionEasing);
  const opacity = useAnimatedGameEntityValue(
    input.opacity,
    plan.transitionDurationMs,
    plan.transitionEasing,
  );
  const scale = useAnimatedGameEntityValue(
    input.scale,
    plan.transitionDurationMs,
    plan.transitionEasing,
  );
  const rotation = useAnimatedGameEntityValue(
    input.rotation,
    plan.transitionDurationMs,
    plan.transitionEasing,
  );
  const progress = useGameEntityMotionProgress(plan);
  const left = Animated.add(x, Animated.multiply(progress, input.motionOffsetX ?? 0));
  const top = Animated.add(y, Animated.multiply(progress, input.motionOffsetY ?? 0));
  const animatedOpacity = Animated.add(
    opacity,
    Animated.multiply(progress, input.motionOpacityDelta ?? 0),
  );
  const animatedScale = Animated.add(scale, Animated.multiply(progress, input.motionScaleDelta ?? 0));
  const animatedRotation = Animated.add(
    rotation,
    Animated.multiply(progress, input.motionRotationDelta ?? 0),
  );

  return {
    left: left.interpolate({
      inputRange: [-10_000, 10_000],
      outputRange: ['-10000%', '10000%'],
    }),
    top: top.interpolate({
      inputRange: [-10_000, 10_000],
      outputRange: ['-10000%', '10000%'],
    }),
    opacity: animatedOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      { scale: animatedScale },
      {
        rotate: animatedRotation.interpolate({
          inputRange: [-36_000, 36_000],
          outputRange: ['-36000deg', '36000deg'],
        }),
      },
    ],
  };
}
