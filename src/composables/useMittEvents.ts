import { onMounted, onUnmounted } from "vue";
import { globalEventBus, type MittEvents } from "@/services/global.service";
import type { Handler } from "mitt";

export function useMittEvents(eventHandlers: {
  [K in keyof MittEvents]?: (payload: MittEvents[K]) => void;
}) {
  onMounted(() => {
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      if (handler) {
        globalEventBus.on(event as keyof MittEvents, handler as Handler);
      }
    });
  });

  onUnmounted(() => {
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      if (handler) {
        globalEventBus.off(event as keyof MittEvents, handler as Handler);
      }
    });
  });

  // 返回清理函数
  return () => {
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      if (handler) {
        globalEventBus.off(event as keyof MittEvents, handler as Handler);
      }
    });
  };
}
