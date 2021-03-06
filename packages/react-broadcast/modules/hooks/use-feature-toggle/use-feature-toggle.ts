import React from 'react';
import camelCase from 'lodash/camelCase';
import warning from 'tiny-warning';
import { isFeatureEnabled } from '@flopflip/react';
import { FlagName, Flags, FlagVariation } from '@flopflip/types';
import { FlagsContext } from '../../components/flags-context';

export default function useFeatureToggle(
  flagName: FlagName,
  flagVariation: FlagVariation = true
): Error | boolean {
  warning(
    flagName === camelCase(flagName),
    '@flopflip/react-broadcast: passed flag name does not seem to be normalized which may result in unexpected toggling. Please refer to our readme for more information: https://github.com/tdeekens/flopflip#flag-normalization'
  );

  if (typeof React.useContext === 'function') {
    /**
     * NODE: `createReactContext` and `React.Context` return incomptaible types which
     * can not be interchanged. Until `createReactContext` is in use this
     * has to remain.
     */
    const flags: Flags = React.useContext(FlagsContext as any);

    return isFeatureEnabled(flagName, flagVariation)(flags);
  }

  throw new Error(
    'React hooks are not available in your currently installed version of React.'
  );
}
