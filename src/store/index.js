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
    // get all todos count
    todosCount: state => state.sections.reduce((acc, section) => acc + section.todos.length, 0),
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
      let words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

      const followersWords = () => {
        let followers = [];
        for (let i = 0; i < 2; i++) {
          followers.push(words[Math.floor(Math.random() * words.length)]);
        }
        return followers;
      }

      const newTodo = {
        id: Math.floor(Math.random() * 1 * 99999),
        title: "",
        description: "New Todo Description",
        created_at: Date.now(),
        link: null,
        addition: null,
        labels: [],
        image: false,
        comments: Math.floor(Math.random() * 1 * 7),
        followers: followersWords()
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

    updateTodoTitle({ commit }, { sectionid, id, title }) {
      const section = this.state.sections.find(section => section.id === sectionid)
      const todo = section.todos.find(todo => todo.id === id)
      todo.title = title;

      appService.updateTodos({ id: sectionid, section }).then((response) => {
        commit("SET_SECTIONS", response.data);
      })
    },

    updateTodo({ commit }, { sectionid, id, todo }) {
      const section = this.state.sections.find(section => section.id === sectionid)
      const todoIndex = section.todos.findIndex(todo => todo.id === id)
      section.todos[todoIndex] = todo;

      appService.updateTodos({ id: sectionid, section }).then((response) => {
        commit("SET_SECTIONS", response.data);
      })
    }

  },
});
