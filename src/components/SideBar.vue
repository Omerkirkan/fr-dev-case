<template>
  <a-layout-sider
    breakpoint="lg"
  >
    <a-menu
      :default-selected-keys="['1']"
      mode="inline"
      theme="light"
      :inline-collapsed="collapsed"
      class="side-menu"
    >
      <a-sub-menu key="sub1" class="ant-menu-custom-style">
        <span class="ant-menu-select-company" slot="title"
          ><a-icon type="mail" /><span>Navigation One</span></span
        >
      </a-sub-menu>

      <a-menu-item key="1">

        <router-link :to="{ name: 'todos' }">

        <a-icon type="home" />
        <span>Option 1</span>
        <span class="menu-count">4</span>
      </router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="desktop" />
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="inbox" />
        <span>Option 3</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
  <script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },

  mounted() {
    window.addEventListener("resize", this.resizeHandler);
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