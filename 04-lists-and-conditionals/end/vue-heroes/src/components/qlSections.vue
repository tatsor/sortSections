<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Sections</h2>
    </div>
    <div class="columns">
      <div class="column is-6">
        <header class="card-header">
          <p class="card-header-title">sections list</p>
        </header>
        <ul class="list is-hoverable">
          <li v-for="section in sections" :key="section.id">
            <button @click="moveUp(section)">Up </button>
            <button  @click="moveDown(section)">Down </button>
            <span>{{ section.id }}</span>
            <span>       ----------{{ section.order }}</span>
            <button  @click="hideSection(section)">Hide </button>
            <button @click="deleteSection(section)">Delete </button>
          </li>
        </ul>
      </div>
    <div class="field">
      <label class="label" for="newSectionOrder">order</label>
        <input
          class="input"
                  id="newSectionOrder"
                  type="number"
                  v-model="newSectionOrder"
        />
      <button @click="addSection(newSectionOrder)">Add </button>
    </div>
    </div>
  </div>
</template>

<script>
import { actions } from "@/lib/utils";
import { sortArray } from "@/lib/utils";
import { HIDDEN_SECTIONS_START_INDEX } from "@/lib/utils";

export default {
  name: 'Sections',
  data() {
    return {
      sections: [],
      newSectionOrder: 1
    };
  },
  created () {
    this.generateSections();
  },
  watch: {
    sections: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        console.log(`New value ${newValue}, Old value ${oldValue}`);
      }
    }
  },
  methods: {
    generateSections() {
      const sections = [];
      for (let i=0; i<5; i++) {
        const section = {};
        section.id = this.uuidv4();
        section.order = i + 1;
        console.log(section.id);
        sections.push(section);
      }
      this.sections = sections;
    },
    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    moveUp(section) {
      const action = actions.UP;
      const sortedArray = sortArray(this.sections, section, action);
      this.sections = sortedArray;
    },

    moveDown(section) {
      const action = actions.DOWN;
      const sortedArray = sortArray(this.sections, section, action);
      this.sections = sortedArray;
    },

    hideSection(section) {
      const action = section.order >= HIDDEN_SECTIONS_START_INDEX ? actions.RESTORE : actions.HIDE;
      const sortedArray = sortArray(this.sections, section, action);
      this.sections = sortedArray;
    },

    deleteSection(section) {
      const action = actions.DELETE;
      const sortedArray = sortArray(this.sections, section, action);
      this.sections = sortedArray;
    },

    addSection(sortOrder) {
      const action = actions.ADD;
      const newSection = {};
      newSection.id = this.uuidv4();
      newSection.order = sortOrder;
      const sortedArray = sortArray(this.sections, newSection, action);
      this.sections = sortedArray;
    }
  },
};
</script>
