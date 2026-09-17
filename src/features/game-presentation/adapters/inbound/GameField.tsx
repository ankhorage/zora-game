import { View } from '@ankhorage/zora';
import { StyleSheet } from 'react-native';

import type { GameFieldProps } from '../../../../types/gamePresentation';

/*** Render a bounded relative-positioning surface for game presentation content. */
export function GameField({
  children,
  aspectRatio,
  minHeight = 240,
  clip = true,
  accessibilityLabel,
  testID,
}: GameFieldProps) {
  return (
    <View
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.root,
        {
          ...(aspectRatio === undefined ? {} : { aspectRatio }),
          minHeight,
          overflow: clip ? 'hidden' : 'visible',
        },
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
  },
});
