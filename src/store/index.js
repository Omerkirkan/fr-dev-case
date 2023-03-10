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

      appService.updateTodos({ id, section });
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
    async addNewTodo({ commit }, sectionId) {
      let words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      let darkerColors = [  "#1c2331",  "#0f3443",  "#2c3e50",  "#34495e",  "#34495e",  "#65737e",  "#95a5a6",  "#7f8c8d",  "#2ecc71",  "#16a085"]
      let lightColors = [  "#f1c40f",  "#f7dc6f",  "#f9e79f",  "#f0e68c",  "#fdfd96",  "#fffacd",  "#fff5ee",  "#fafad2",  "#f5fffa",  "#f0fff0"]

      const followersWords = () => {
        let followers = [];
        for (let i = 0; i < Math.floor(Math.random() * 1 * 3); i++) {
          followers.push({
            name: words[Math.floor(Math.random() * words.length)],
            color: darkerColors[Math.floor(Math.random() * darkerColors.length)],
            bg: lightColors[Math.floor(Math.random() * lightColors.length)]
          });
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

      const response = appService.updateTodos({ id: sectionId, section }).then((response) => {
        commit("SET_SECTIONS", response.data);
        return response;
      })

      return await response;
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

      appService.updateTodos({ id, section })
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
    },

    deleteTodo({ commit }, { sectionid, id }) {
      const section = this.state.sections.find(section => section.id === sectionid)
      const todoIndex = section.todos.findIndex(todo => todo.id === id)
      section.todos.splice(todoIndex, 1);

      appService.updateTodos({ id: sectionid, section }).then((response) => {
        commit("SET_SECTIONS", response.data);
      })
    }

  },
});
