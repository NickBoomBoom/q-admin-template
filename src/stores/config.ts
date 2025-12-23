import { SYSTEM_CONFIG } from '@/config/base';
import type { ConfigStore } from './types';

export const useConfigStore = defineStore('config', (): ConfigStore => {
  const systemConfig = ref<SystemConfig>(SYSTEM_CONFIG);

  return {
    systemConfig,
  };
});
