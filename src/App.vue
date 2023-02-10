<template>
  <div id="app">
    <a-layout id="components-layout-demo-responsive" style="height: 100vh;">
      <sideBar />

      <a-layout>
        <a-layout-content :style="{ margin: '10px 16px 0' }">
          <div
            :style="{ padding: '24px' }"
          >
            
          <router-view></router-view>

          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import sideBar from "@/components/SideBar.vue";
export default {
  name: "App",
  components: {
    sideBar
  }
}
</script>