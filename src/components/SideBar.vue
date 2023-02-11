<template>
  <a-layout-sider breakpoint="lg" width="300" class="side-bar-custom-style">
    <a-menu
      :default-selected-keys="['1']"
      mode="inline"
      theme="light"
      :inline-collapsed="collapsed"
      class="side-menu"
    >
      <a-sub-menu key="sub1" class="ant-menu-custom-style">
        <span class="ant-menu-select-company" slot="title">
          <i class="side-select-company-icon"></i> <span>Company</span></span
        >
      </a-sub-menu>

      <a-menu-item key="1">
        <router-link :to="{ name: 'todos' }">
          <a-icon type="appstore" />
          <span>Tasks</span>
          <span class="menu-count">{{ todosCount }}</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link :to="{ name: 'todos' }">
        <a-icon type="bell" />
        <span>Notifications</span>
        <span class="menu-count" style="background-color: #F2F4F7;color: black;">7</span>
      </router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="bar-chart" />
        <span>Analytics</span>
      </a-menu-item>
      <a-menu-item key="4">
        <a-icon type="user" />
        <span>Team</span>
        <span class="menu-count" style="background-color: #F2F4F7;color: black;">2</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
  <script>
  import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      collapsed: false,
    };
  },

  mounted() {
    window.addEventListener("resize", this.resizeHandler);
  },

  computed: {
    ...mapGetters(['todosCount']),
  },

  methods: {
    resizeHandler() {
      if (document.body.clientWidth <= 768) {
        this.collapsed = true;
      } else {
        this.collapsed = false;
      }
    },
  },
};
</script>