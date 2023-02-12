<template>
  <a-card
    size="small"
    class="todo-list-card"
    :title="todo.title"
    style="width: 100%"
    :hoverable="true"
    :loading="cardLoading"
    @click="editTodo()"
  >
    <input
      type="text"
      v-model="todoName"
      ref="todonameeditinput"
      @keypress.enter="todoNameEdited()"
      @blur="todoNameEdited()"
      v-if="todoNameEdit"
    />
    <div>
    <span :class="{'todo-created-date': !todoNameEdit}">
      {{ getDateFormat }} - Created by <b class="strong-text">Admin</b>
    </span>
  </div>

    <p class="todo-card-description">{{ todo.description }}</p>

    <img
      src="@/assets/images/card-sample-img.png"
      class="todo-card-img"
      v-if="todo.image"
    />

    <div class="todo-card-addition">
      <div v-if="todo.link">
        <a-icon type="clock-circle" />
        <span> {{ todo.link | beShort }} </span>
      </div>
      <div class="ml-15" v-if="todo.addition">
        <a-icon type="user" />
        <span> {{ todo.addition | beShort }} </span>
      </div>
    </div>

    <div class="todo-card-labels">
      <a-tag
        class="colorful-label"
        :color="colors[i]"
        v-for="(label, i) in todo.labels"
        :key="label + i"
      >
        {{ label }}
      </a-tag>
    </div>

    <div class="todo-card-comment">
      <div class="todo-comment-area">
        <a-icon type="message" class="mr-5" />
        <span> {{ todo.comments }} </span>
      </div>
      <div>
        <a-avatar
          v-for="(follower, i) in todo.followers"
          :key="i"
          :style="{'color': follower.color, 'background': follower.bg}"
        >
          <span v-text="follower.name"></span>
        </a-avatar>
      </div>
    </div>
  </a-card>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "TodoCard",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    sectionid: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      cardLoading: true,
      todoNameEdit: false,
      todoName: this.todo.title,
      editModalVisible: false,
      colors: [
        "magenta",
        "red",
        "volcano",
        "orange",
        "gold",
        "lime",
        "green",
        "cyan",
        "blue",
        "geekblue",
        "purple",
      ],
    };
  },

  filters: {
    beShort(value) {
      if (value) {
        if (value.length > 11) {
          return value.substring(0, 11) + "...";
        }
      }

      return value;
    },
  },

  computed:{
    getDateFormat(){
      return new Date(this.todo.created_at).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
        }
      );
    },
  },

  mounted() {
    setTimeout(() => {
      this.cardLoading = false;
    }, 1000);
  },

  methods: {
    ...mapActions({
      _updateTodo: "updateTodoTitle",
    }),
    editTodoName() {
      this.todoNameEdit = true;
      this.$nextTick(() => {
        this.$refs.todonameeditinput.focus();
      });
    },
    todoNameEdited() {
      this.todoNameEdit = false;
      this._updateTodo({
        sectionid: this.sectionid,
        id: this.todo.id,
        title: this.todoName,
      });
    },
    editTodo() {
      this.$router
        .push({
          name: "todo",
          params: { sectionid: this.sectionid, todo: this.todo },
        })
        .catch(() => {});
    },
  },
};
</script>