import { onMounted, onUnmounted } from "vue";
import { globalEventBus, type MittEvents } from "@/services/global.service";
import type { Handler } from "mitt";

// 单个事件版本
export function useMitt<K extends keyof MittEvents>(
  event: K,
  handler: (payload: MittEvents[K]) => void
) {
  onMounted(() => {
    globalEventBus.on(event, handler as Handler);
  });

  onUnmounted(() => {
    globalEventBus.off(event, handler as Handler);
  });

  // 返回清理函数
  return () => globalEventBus.off(event, handler as Handler);
}
