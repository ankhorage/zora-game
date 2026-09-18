import React from 'react';
import { Animated, Easing } from 'react-native';

import type { GameEntityEasing } from '../../../types/gamePresentation';
import type { GameEntityMotionPlan } from './resolveGameEntityMotionPlan';

/*** Drive one optional relative GameEntity motion timeline without changing game-session state. */
export function useGameEntityMotionProgress(plan: GameEntityMotionPlan): Animated.Value {
  const [progress] = React.useState(() => new Animated.Value(0));
  const signature = createMotionSignature(plan);
  const previousSignature = React.useRef(signature);

  React.useEffect(() => {
    progress.stopAnimation();

    if (!plan.motionEnabled) {
      progress.setValue(0);
      return undefined;
    }

    if (previousSignature.current !== signature) {
      progress.setValue(0);
      previousSignature.current = signature;
    }

    if (plan.motionPaused) return undefined;

    const animation = createMotionAnimation(progress, plan);
    animation.start();
    return () => animation.stop();
  }, [plan, progress, signature]);

  return progress;
}

/*** Create the one-shot or repeating React Native motion sequence for one entity. */
function createMotionAnimation(progress: Animated.Value, plan: GameEntityMotionPlan) {
  const forward = () =>
    Animated.timing(progress, {
      toValue: 1,
      duration: plan.motionDurationMs,
      easing: resolveMotionEasing(plan.motionEasing),
      useNativeDriver: false,
    });
  const reverse = () =>
    Animated.timing(progress, {
      toValue: 0,
      duration: plan.motionDurationMs,
      easing: resolveMotionEasing(plan.motionEasing),
      useNativeDriver: false,
    });
  const movement = plan.motionAlternate
    ? Animated.loop(Animated.sequence([forward(), reverse()]))
    : plan.motionRepeat
      ? Animated.loop(forward())
      : forward();

  return plan.motionDelayMs === 0
    ? movement
    : Animated.sequence([Animated.delay(plan.motionDelayMs), movement]);
}

/*** Create a stable signature for motion parameters that should restart the relative timeline. */
function createMotionSignature(plan: GameEntityMotionPlan): string {
  return [
    plan.motionDurationMs,
    plan.motionDelayMs,
    plan.motionEasing,
    plan.motionEnabled,
    plan.motionRepeat,
    plan.motionAlternate,
  ].join(':');
}

/*** Map serializable timeline easing names onto React Native easing functions. */
function resolveMotionEasing(easing: GameEntityEasing) {
  if (easing === 'ease-in') return Easing.in(Easing.ease);
  if (easing === 'ease-out') return Easing.out(Easing.ease);
  if (easing === 'ease-in-out') return Easing.inOut(Easing.ease);
  return Easing.linear;
}
