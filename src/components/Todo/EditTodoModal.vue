<template>
  <a-modal v-model="visible" @ok="handleOk" :maskClosable="false" @afterClose="handleOk" :closable="false">
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="Title">
        <a-input v-model="todoFields.title" />
      </a-form-item>
      <a-form-item label="Description">
        <a-textarea v-model="todoFields.description" placeholder="Basic usage" :rows="4" />
      </a-form-item>
      <a-form-item label="Link">
        <a-input v-model="todoFields.link" />
      </a-form-item>
      <a-form-item label="Addition">
        <a-input v-model="todoFields.addition" />
      </a-form-item>
      <a-form-item label="Labels">
        <a-checkbox-group v-model="todoFields.labels" @change="onChange">
          <a-row>
            <a-col :span="8">
              <a-checkbox value="Design"> Design </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="Development"> Development </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="Testing"> Testing </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="Deployment"> Deployment </a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="Maintenance"> Maintenance </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="Image">
        <a-button type="light"> <a-icon type="plus" /> Upload Image </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
  <script>
export default {
  props: ["sectionid", "todo"],
  data() {
    return {
      visible: true,
      todoFields: this.todo
    };
  },

  watch: {
    $route(newVal) {
      this.visible = newVal.meta && newVal.meta.showModal;
    }
  },

  mounted() {
    if( !this.todo.created_at ) {
        this.$router.push({ name: "todos" });
    }
  },

  methods: {
    handleOk() {
        this.$store.dispatch("updateTodo", { sectionid: this.sectionid, id: this.todo.id, todo: this.todoFields });
      this.$router.push({ name: "todos" });
    },
    handleSubmit(e) {
      e.preventDefault();
    },
    onChange(checkedValues) {
      console.log("checked = ", checkedValues);
    },
  },
};
</script>
  