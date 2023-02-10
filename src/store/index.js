import Vue from "vue";
import Vuex from "vuex";
import appService from "@/services/appService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sections: [],
  },
  getters: {
    sections: (state) => state.sections,
    todos: state => id => state.sections.find(section => section.id === id).todos,
  },
  mutations: {
    SET_SECTIONS(state, sections) {
      state.sections = sections;
    },
  },
  actions: {
    // Bu tüm sections'ları getirir
    async getSections({ commit }) {
      const response = await appService.getSections();
      commit("SET_SECTIONS", response.data);
    },

    // Bu senctionların yeri değişince guncelleme yapar
    updateSections({ commit }, sections) {
      appService.updateSections(sections).then(() => {
        appService.getSections().then((response) => {
          commit("SET_SECTIONS", response.data);
        });
      });
    },

    // Bu ise todos'ların yeri değişince guncelleme yapar
    updateTodos(_, { id, todos }) {

      const section = this.state.sections.find(section => section.id === id)
      section.todos = todos;
      
      console.log(section);

      appService.updateTodos({ id, section }).then((response) => {
        console.log(response);
      })
    },

    // Bu ise yeni bir section ekler
    addNewSection({ commit }) {

      const maxId = Math.max(...this.state.sections.map(section => section.id));

      const newSection = {
        id: maxId + 1,
        title: "New Section",
        todos: [],
      };

      appService.addNewSection(newSection).then((response) => {
        commit("SET_SECTIONS", response.data);
      });

    },

    // Bu ise yeni bir todo ekler
    addNewTodo({ commit }, sectionId) {
      const newTodo = {
        id: Math.floor(Math.random() * 1 * 99999),
        title: "",
        description: "New Todo Description",
      };

      const section = this.state.sections.find(section => section.id === sectionId)
      section.todos.push(newTodo);

      appService.updateTodos({ id: sectionId, section }).then((response) => {
        commit("SET_SECTIONS", response.data);
      })
    },

    // Bu ise section'ı siler
    deleteSection({ commit }, id) {
      appService.deleteSection(id).then((response) => {
        commit("SET_SECTIONS", response.data);
      });
    },

    updateSectionTitle(_ , { id, title }) {
      const section = this.state.sections.find(section => section.id === id)
      section.title = title;

      appService.updateTodos({ id, section }).then((response) => {
        console.log(response);
      })
    },

    updateTodo({ commit }, { sectionid, id, title }) {
      const section = this.state.sections.find(section => section.id === sectionid)
      const todo = section.todos.find(todo => todo.id === id)
      todo.title = title;

      appService.updateTodos({ id: sectionid, section }).then((response) => {
        commit("SET_SECTIONS", response.data);
      })
    }

  },
});
