import { useMemo } from 'react';

interface UseSprinkleProps {
  props: Record<string, unknown>;
  sprinklesSet: Set<string>;
}

export const useSprinkleProps = (
  props: Record<string, unknown>,
  sprinklesSet: Set<string>,
) => {
  const { sprinkleProps, nativeProps } = useMemo(() => {
    return Object.entries(props).reduce(
      (acc, [key, value]) => {
        if (sprinklesSet.has(key)) {
          acc.sprinkleProps[key] = value;
        } else {
          acc.nativeProps[key] = value;
        }

        return acc;
      },
      {
        sprinkleProps: {} as Record<string, unknown>,
        nativeProps: {} as Record<string, unknown>,
      },
    );
  }, [props, sprinklesSet]);

  return { sprinkleProps, nativeProps };
};
