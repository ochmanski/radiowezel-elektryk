import { IDefaultAPIResponse } from '@types';

export type passportDoneFunction = (
  err: Error | string | undefined,
  id?: string | object | boolean,
) => void;

export type normalizeApiResponseFormat = (
  data: IDefaultAPIResponse['data'],
  errorMessage: IDefaultAPIResponse['errorMessage'],
) => IDefaultAPIResponse;

export interface IgetAdorableAvatars {
  /**
   * Wielkości avatarów podane w px, np. [20, 200]
   */
  avatarSizes?: number[];

  /**
   * Identyfikator na podstawie którego generuje się avatar
   */
  id: string;
}

export type getAdorableAvatarsTypedef = (
  id: IgetAdorableAvatars['id'],
  avatarSizes?: IgetAdorableAvatars['avatarSizes'],
) => string[];
