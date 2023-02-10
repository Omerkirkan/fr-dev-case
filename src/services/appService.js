import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


export default {
  getSections() {
    return apiClient.get("/sections");
  },

  updateSection({ id, section }) {
    return apiClient.put(`/sections/${id}`, section);
  },


  async updateSections(sections) {
    const response = await apiClient.get("/sections").then((response) => {
      const currentIds = response.data.map((section) => section.id);
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const id = currentIds[i];
        apiClient.put(`/sections/${id}`, section)
      }

        return apiClient.get("/sections");
    });

    return await response;
  },


  async updateTodos({ id, section }) {
    const response = apiClient.put(`/sections/${id}`, section).then(() => {
      return apiClient.get("/sections");
    });

    return await response;
  },

  async addNewSection(section) {
     const response = apiClient.post("/sections", section).then(() => {
      return apiClient.get("/sections");
    });

    return await response;
  
  },

  async deleteSection(id) {
    const response = apiClient.delete(`/sections/${id}`).then(() => {
      return apiClient.get("/sections");
    });

    return await response;
  },


};
