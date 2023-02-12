<template>
  <a-modal
    v-model="visible"
    @ok="handleOk"
    :maskClosable="false"
    @afterClose="handleOk"
    :closable="false"
    @cancel="handleCancel"
  >
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="Title">
        <a-input v-model="todoFields.title" />
      </a-form-item>
      <a-form-item label="Description">
        <a-textarea
          v-model="todoFields.description"
          placeholder="Basic usage"
          :rows="4"
        />
      </a-form-item>
      <a-form-item label="Link">
        <a-input v-model="todoFields.link" />
      </a-form-item>
      <a-form-item label="Addition">
        <a-input v-model="todoFields.addition" />
      </a-form-item>
      <a-form-item label="Labels">
        <a-checkbox-group v-model="todoFields.labels">
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
        <a-button :type="getImgBtnType" @click="todoFields.image = !todoFields.image" :ghost="todoFields.image" >
          <a-icon :type="getImgIconType" /> {{ todoFields.image ? "Remove" : "Add" }}
        </a-button>
      </a-form-item>
      <div>
        <div class="ant-col ant-col-5 ant-form-item-label"></div>
        <a-button type="danger" @click="deleteTask()" ghost >
          <a-icon type="delete" /> Delete Task
        </a-button>
      </div>
    </a-form>
  </a-modal>
</template>
  <script>
export default {
  props: ["sectionid", "todo"],
  data() {
    return {
      visible: true,
      todoFields: this.todo,
      todoDatas: null,
    };
  },

  watch: {
    $route(newVal) {
      this.visible = newVal.meta && newVal.meta.showModal;
    },
  },

  mounted() {
    if (!this.todo.created_at) {
      this.$router.push({ name: "todos" });
    }
    this.todoDatas = JSON.parse(JSON.stringify(this.todo));
  },

  computed: {
    getImgBtnType() {
      return this.todoFields.image ? "danger" : "light";
    },
    getImgIconType() {
      return this.todoFields.image ? "close" : "upload";
    },
  },

  methods: {
    handleOk() {
      // burda todoFields ve todoDatas eşitse todo'yu güncelleme
      if (JSON.stringify(this.todoFields) === JSON.stringify(this.todoDatas)) {
        this.$router.push({ name: "todos" });
        console.log("No changes");
        return;
      } else {
        this.$store.dispatch("updateTodo", {
          sectionid: this.sectionid,
          id: this.todo.id,
          todo: this.todoFields,
        });
        this.$router.push({ name: "todos" });
      }
    },
    handleCancel() {
      this.$router.push({ name: "todos" });
    },
    deleteTask() {
      this.$store.dispatch("deleteTodo", {
        sectionid: this.sectionid,
        id: this.todo.id,
      });
      this.$router.push({ name: "todos" });
    },
  },
};
</script>
  