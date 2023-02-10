<template>
  <div class="list-section">
    <div class="list-section-header">
      <span v-if="!sectionTitleEdit" @click="editTitle()"> {{ section.title }} </span>
      <input type="text" v-model="sectionTitle" ref="sectiontitleedit" v-if="sectionTitleEdit" @blur="updateTitle()">
      <button @click="addNewTodo()"> Add New Todo </button>
      <button @click="deleteSection()"> De </button>
    </div>
    <div class="list-section-body">
      <draggable
        v-model="todos"
        :options="{ group: 'todos' }"
        group="todos"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group name="list" tag="div">
          <TodoCard
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
          ></TodoCard>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>
<script>
import TodoCard from "@/components/Todo/TodoCard.vue";
import draggable from "vuedraggable";
export default {
  name: "SectionComp",
  props: {
    section: {
      type: Object,
      required: true,
    },
  },
  components: {
    TodoCard,
    draggable,
  },
  data() {
    return {
      drag: false,
      sectionTitle: this.section.title,
      sectionTitleEdit: false,
    };
  },

  computed: {
    todos: {
      get() {
        return this.$store.getters.todos(this.section.id);
      },
      set(todos) {
        this.$store.dispatch("updateTodos", { id: this.section.id, todos });
      },
    },
  },

  methods: {
    addNewTodo() {
      this.$store.dispatch("addNewTodo", this.section.id);
    },
    deleteSection() {
      this.$store.dispatch("deleteSection", this.section.id);
    },
    editTitle() {
      this.sectionTitleEdit = true;
      this.$nextTick(() => {
        this.$refs.sectiontitleedit.focus();
      });
    },
    updateTitle() {
      this.sectionTitleEdit = false;
      this.$store.dispatch("updateSectionTitle", {
        id: this.section.id,
        title: this.sectionTitle,
      });
    },
  },
};
</script>