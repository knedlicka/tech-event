import { beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

beforeEach(() => {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedState)
  setActivePinia(pinia);
});
