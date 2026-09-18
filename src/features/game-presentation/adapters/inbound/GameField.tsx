import { View } from '@ankhorage/zora';
import { StyleSheet } from 'react-native';

import type { GameFieldProps } from '../../../../types/gamePresentation';

/*** Render a bounded relative-positioning surface for game presentation content. */
export function GameField({
  children,
  aspectRatio,
  minHeight = 240,
  fill = false,
  clip = true,
  accessibilityLabel,
  testID,
}: GameFieldProps) {
  return (
    <View
      {...(accessibilityLabel === undefined ? {} : { accessibilityLabel })}
      {...(testID === undefined ? {} : { testID })}
      style={[
        styles.root,
        clip ? styles.clipped : styles.overflowVisible,
        fill ? styles.fill : undefined,
        {
          ...(aspectRatio === undefined ? {} : { aspectRatio }),
          minHeight,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  clipped: {
    overflow: 'hidden',
  },
  fill: {
    flex: 1,
  },
  overflowVisible: {
    overflow: 'visible',
  },
  root: {
    position: 'relative',
    width: '100%',
  },
});
