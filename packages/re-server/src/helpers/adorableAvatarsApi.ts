import {
  IgetAdorableAvatars,
  getAdorableAvatarsTypedef,
} from '@types';

// http://api.adorable.io/avatars/150/5c239f6123d25a02e227525d
const baseUri: string = 'http://api.adorable.io';
const avatarsApi: string = `${baseUri}/avatars`;
// tslint:disable-next-line
const defaultAvatarSizes: number[] = [50, 150];

const getAdorableAvatars: getAdorableAvatarsTypedef = (
  id: IgetAdorableAvatars['id'],
  avatarSizes: IgetAdorableAvatars['avatarSizes'] = defaultAvatarSizes,
): string[] => (
  avatarSizes.map((size: number) => `${avatarsApi}/${size}/${id}.png`)
);

export {
  getAdorableAvatars,
};
