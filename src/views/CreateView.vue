<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Создать задачу</h1>
      <form @submit.prevent="submitHundler">
        <div class="input-field">
          <input
            id="first_name"
            type="text"
            class="validate"
            v-model="title"
            required
          />
          <label for="first_name">Название задачи</label>
          <span
            class="helper-text"
            data-error="Название задачи обязательно"
          ></span>
        </div>
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
        <button class="btn" type="submit">Создать задачу</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateView",
  data: () => ({
    description: "",
    title: "",
    chips: null,
    date: null,
  }),
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Теги задачи",
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(),
      setDefaultDate: true,
    });
  },
  methods: {
    submitHundler() {
      const task = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        status: "active",
        tags: this.chips.chipsData,
        date: this.date.date,
      };
      this.$store.dispatch("createTask", task);
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
