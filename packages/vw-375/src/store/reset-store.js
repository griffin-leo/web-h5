import { cloneDeep } from 'lodash-es';

export default function resetStore({ store }) {
  const initialStore = cloneDeep(store.$state);
  store.$reset = () => store.$patch(cloneDeep(initialStore));
}
