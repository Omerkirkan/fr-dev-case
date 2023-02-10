<template>
  <a-card size="small" class="todo-list-card" :title="todo.title" style="width: 100%;" :hoverable="true" :loading="cardLoading">
    <input type="text" v-model="todoName" ref="todonameeditinput" @blur="todoNameEdited()" v-if="todoNameEdit">
    <p>{{ todo.status }}</p>
    <p> {{ todo.description }} </p>
    <p>card content</p>
  </a-card>
</template>
<script>
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
        };
    },

    mounted() {
        setTimeout(() => {
            this.cardLoading = false;
        }, 1000);
    },

    methods: {
        editTodoName() {
            this.todoNameEdit = true;
            this.$nextTick(() => {
                this.$refs.todonameeditinput.focus();
            });
        },
        todoNameEdited() {
            this.todoNameEdit = false;
            this.$store.dispatch("updateTodo", {sectionid: this.sectionid, id: this.todo.id, title: this.todoName });
        },
    },
};
</script>