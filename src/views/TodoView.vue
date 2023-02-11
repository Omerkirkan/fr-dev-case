<template>
  <div>
    <a-button type="primary" @click="addNewSection()"> <a-icon type="plus" /> Add New Section </a-button>
    <div>
      <draggable
        v-model="sections"
        :options="{ group: 'sections' }"
        group="sections"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group class="sections-container">
          <SectionComp
            v-for="section in sections"
            :key="section.id"
            :section="section"
            ref="todosectioncomp"
          ></SectionComp>
        </transition-group>
      </draggable>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import SectionComp from "@/components/Todo/SectionComp.vue";
import draggable from "vuedraggable";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TodoView",
  components: {
    SectionComp,
    draggable,
  },
  data() {
    return {
      drag: false,
    };
  },

  created() {
    // Bunu router a taşıyabiliriz
    this.$store.dispatch("getSections");
  },

  computed: {
    ...mapGetters({
      _sections: "sections"
    }),

    sections: {
      get() {
        return this._sections;
      },
      set(value) {
        this._updateSections(value);
      },
    },
  },

  methods: {
    ...mapActions({
      _addNewSection: "addNewSection",
      _updateSections: "updateSections",
    }),

    addNewSection() {
      this._addNewSection();

      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.todosectioncomp[this.sections.length - 1].editTitle();
        });
      }, 200);
    },
  },
};
</script>