<template>
  <div class="layout-breadcrumb">
    <span v-for="(item, index) in breadcrumb" :key="item.name">
      {{ item.meta?.title }}<span v-if="index !== breadcrumb.length - 1">&nbsp;/&nbsp;</span>
    </span>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const globalStore = useGlobalStore()
const breadcrumb = ref<RouteRecordRaw[]>([])

watch(
  route,
  (v: any) => {
    check()
  },
  {
    immediate: true
  }
)

function check() {
  breadcrumb.value = globalStore.getBreadcrumb(route.name)
}
</script>
