<template>
  <div>
    <button @click="addNewSection"> Add New Section </button>
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
          ></SectionComp>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>
<script>
import SectionComp from "@/components/Todo/SectionComp.vue";
import draggable from "vuedraggable";

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
    sections: {
      get() {
        return this.$store.getters.sections;
      },
      set(value) {
        this.$store.dispatch('updateSections', value);
      },
    },
  },

  methods: {
    addNewSection() {
      this.$store.dispatch('addNewSection');
    }
  }

};
</script>