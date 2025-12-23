<template>
  <div
    class="layout-tab !h-8 flex items-center"
    :class="{
      'px-2': !isShowArrow,
    }"
  >
    <div
      v-if="isShowArrow"
      @click="handleScrollMove('l')"
      class="w-6 flex-shrink-0 h-full cursor-pointer flex items-center justify-center hover:bg-gray-50"
    >
      <div class="i-material-symbols-arrow-back-ios-new-rounded" />
    </div>

    <el-scrollbar ref="scrollbarRef" noresize class="flex-1">
      <div class="flex flex-nowrap">
        <div
          v-for="item in tabs"
          :key="item.fullPath"
          class="layout-tab-item rounded-t-3 h-8 flex shrink-0 items-center text-sm px-2 py-1 !ml-0 cursor-pointer border b-solid b-1"
          :class="[
            isCurrent(item)
              ? 'active bg-primary text-white b-primary'
              : 'hover:bg-primary/30 hover:text-white hover:border-primary/30  ',
          ]"
          @click.self="handleTap(item)"
        >
          {{ item.query.t || item.meta.title }}
          <template v-if="isCurrent(item)">
            <div
              class="i-material-symbols-refresh ml-1 text-xl"
              @click.self="handleRefreshTag(item)"
            ></div>
          </template>

          <div
            v-if="!isOnlyOne"
            class="i-material-symbols-close-rounded text-xl"
            @click.self="handleDeleteTag(item)"
          ></div>
        </div>
      </div>
    </el-scrollbar>
    <div
      v-if="isShowArrow"
      @click="handleScrollMove('r')"
      class="w-6 flex-shrink-0 h-full cursor-pointer flex items-center justify-center hover:bg-gray-50"
    >
      <div class="i-material-symbols-arrow-forward-ios-rounded" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { globalEventBus } from "@/services/global.service";
import { useResizeObserver } from "@vueuse/core";

const route = useRoute();
const router = useRouter();
const tabStore = useTabStore();
const { tabs } = storeToRefs(tabStore);
const scrollbarRef = ref();
const isShowArrow = ref(false);
const isOnlyOne = computed(() => {
  return tabs.value.length === 1;
});

onMounted(() => {
  useResizeObserver(scrollbarRef.value.wrapRef, () => {
    checkShowArrow();
  });
});
function isCurrent(item: TAB_ITEM) {
  return item.fullPath === route.fullPath;
}

function handleDeleteTag(r: TAB_ITEM) {
  tabStore.removeTab(r);
}

function handleRefreshTag(_r: TAB_ITEM) {
  globalEventBus.emit("refresh");
}

function handleTap(r: TAB_ITEM) {
  router.push({
    name: r.name!,
    params: r.params,
    query: r.query,
  });
}

function checkShowArrow() {
  const { wrapRef } = scrollbarRef.value;
  const sw = wrapRef.scrollWidth;
  const { width } = wrapRef.getBoundingClientRect();
  isShowArrow.value = sw > width + 2;
}

function handleScrollMove(type: "l" | "r") {
  const { wrapRef } = scrollbarRef.value;
  const { scrollLeft } = wrapRef;
  const { width } = wrapRef.getBoundingClientRect();

  const left = type === "l" ? scrollLeft - width : scrollLeft + width;
  wrapRef.scrollTo({
    left,
    behavior: "smooth",
  });
}
</script>

<style scoped lang="scss">
.layout-tab {
  box-shadow: 0px 4px 6px rgba(0, 21, 41, 0.1);
}
</style>
