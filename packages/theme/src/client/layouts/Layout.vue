<template>
  <div class="theme-container">
    <Common>
      <div>测试2</div>
    </Common>
  </div>
</template>

<script lang="ts" setup>
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import Common from "../components/Common/index.vue";
const page = usePageData();
const frontmatter = usePageFrontmatter();

console.log(frontmatter.value);

// const { isShowSidebar, isShowCatalog } = useSidebarData()
</script>
