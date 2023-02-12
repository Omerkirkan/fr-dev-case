<template>
  <div class="list-section">
    <div class="list-section-header">
      <span v-if="!sectionTitleEdit" @click="editTitle()"> {{ section.title }} </span>
      <input type="text" v-model="sectionTitle" ref="sectiontitleedit" v-if="sectionTitleEdit" @keypress.enter="updateTitle()" @blur="updateTitle()">
      <div>
      <a-button type="primary" @click="addNewTodo()" ghost class="mr-5" v-if="!sectionTitleEdit"> <a-icon type="plus" /> Add New Todo </a-button>
      <a-button type="danger" @click="deleteSection()" ghost v-if="!sectionTitleEdit"> <a-icon type="delete" /></a-button>
    </div>
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
            :sectionid="section.id"
            ref="todocardcomp"
          ></TodoCard>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>
<script>
import TodoCard from "@/components/Todo/TodoCard.vue";
import draggable from "vuedraggable";
import { mapGetters, mapActions } from "vuex";
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
    ...mapGetters({
      _todos: "todos",
    }),
    todos: {
      get() {
        return this._todos(this.section.id);
      },
      set(todos) {
        this._updateTodos({ id: this.section.id, todos });
      },
    },
  },

  methods: {
    ...mapActions({
      _updateTodos: "updateTodos",
      _deleteSection: "deleteSection",
      _updateSectionTitle: "updateSectionTitle",
      _addNewTodo: "addNewTodo",
    }),
    addNewTodo() {
      // todo oluşturulduktan sonra inputa focuslanması için
      this._addNewTodo(this.section.id).then(() => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.todocardcomp[this.todos.length - 1].editTodoName();
          }, 1000);
        });
      });

    },
    deleteSection() {
      this._deleteSection(this.section.id)
    },
    editTitle() {
      this.sectionTitleEdit = true;
      this.$nextTick(() => {
        this.$refs.sectiontitleedit.focus();
      });
    },
    updateTitle() {
      this.sectionTitleEdit = false;
      this._updateSectionTitle({
        id: this.section.id,
        title: this.sectionTitle,
      });
    },
  },
};
</script>