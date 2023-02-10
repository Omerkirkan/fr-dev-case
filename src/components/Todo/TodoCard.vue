<template>
  <a-card size="small" class="todo-list-card" :title="todo.title" style="width: 100%;" :hoverable="true" :loading="cardLoading">
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
    },

    data() {
        return {
            cardLoading: true,
        };
    },

    mounted() {
        setTimeout(() => {
            this.cardLoading = false;
        }, 1000);
    },
};
</script>