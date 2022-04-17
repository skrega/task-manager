<template>
  <div class="row">
    <div class="col s6 offset-s3" v-if="task">
      <h1>{{ task.title }}</h1>
      <form @submit.prevent="submitHundler">
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea
            id="description"
            class="materialize-textarea"
            v-model="description"
          ></textarea>
          <label for="description">Описание</label>
          <span class="character-counter" style="float: right; font-size: 12px"
            >{{ description.length }}/2048</span
          >
        </div>
        <input type="text" ref="datepicker" />
        <div v-if="task.status !== 'completed'">
          <button class="btn" type="submit">Изменить задачу</button>
          <button class="btn blue" type="button" @click="compliteTask()">
            Завершить задачу
          </button>
        </div>
      </form>
    </div>
    <p v-else>Задача не найдена</p>
  </div>
</template>

<script>
export default {
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    },
  },
  data: () => ({
    description: "",
    chips: null,
    date: null,
  }),
  mounted() {
    this.description = this.task.description;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Теги задачи",
      data: this.task.tags,
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(this.task.date),
      setDefaultDate: true,
    });
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    submitHundler() {
      this.$store.dispatch("updateTask", {
        id: this.task.id,
        description: this.description,
        date: this.date.date,
      });
      this.$router.push("/list");
    },
    compliteTask() {
      this.$store.dispatch("compliteTask", this.task.id);
      this.$router.push("/list");
    },
  },
  destroyed() {
    if (this.date && this.date.destroyed) {
      this.date.destroy();
    }
    if (this.chips && this.chips.destroyed) {
      this.chips.destroy();
    }
  },
};
</script>

<style lang="scss" scoped>
#description {
  min-height: 150px;
  overflow-y: scroll;
}
.btn.blue {
  margin-left: 2rem;
}
</style>