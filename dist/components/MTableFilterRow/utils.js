var o = Object.assign;
import { defaultProps as l } from './';
export const getLocalizationData = (e) => o(o({}, l.localization), e),
  getLocalizedFilterPlaceHolder = (e, t) =>
    e.filterPlaceholder || getLocalizationData(t).filterPlaceHolder || '';
