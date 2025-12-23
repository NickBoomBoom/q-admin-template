import { SYSTEM_CONFIG } from '@/config/base';

export const useConfigStore = defineStore('config', () => {
  const systemConfig = ref<SystemConfig>(SYSTEM_CONFIG);

  return {
    systemConfig,
  };
});
