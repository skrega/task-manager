<template>
  <h1>Список задач</h1>
  <div class="list-task__head">
    <div class="input-field">
      <select class="select-filter" ref="select" v-model="filter">
        <option value="" disabled selected>Выберите статус</option>
        <option value="active">Active</option>
        <option value="outdated">Outdate</option>
        <option value="completed">Complite</option>
      </select>
      <label>Фильтр по статусу</label>
    </div>

    <button
      class="btn btn-small red darken-1"
      v-if="filter"
      @click="filter = null"
    >
      Очистить фильтр
    </button>
  </div>
  <hr />
  <div class="items" v-if="tasks.length">
    <div
      :id="idx"
      class="card"
      v-for="(task, idx) of displayTasks"
      :key="task.id"
    >
      <div class="card-content">
        <div class="card-row">
          <p class="card-title">#{{ idx + 1 }} - {{ task.title }}</p>
        </div>
        <div class="card-row">
          <div class="card-title">Дата</div>
          <p class="card-text">
            {{ new Date(task.date).toLocaleDateString() }}
          </p>
        </div>
        <div class="card-row">
          <div class="card-title">Описание</div>
          <p class="card-text card-description">{{ task.description }}</p>
        </div>
        <div class="card-row">
          <div class="card-title">Статус</div>
          <p class="card-text">{{ task.status }}</p>
        </div>
        <router-link tag="button" class="btn" :to="'/task/' + task.id"
          >Посмотреть</router-link
        >
      </div>
      <button
        class="btn red darken-1 card-btn-remove"
        @click="tasks.splice(idx, 1)"
      >
        Удалить
      </button>
    </div>
  </div>
  <p v-else>Список задач пуст</p>
</template>

<script>
export default {
  data: () => ({
    filter: null,
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    displayTasks() {
      return this.tasks.filter((t) => {
        if (!this.filter) {
          return true; //то есть показываем все задачи
        }
        return t.status === this.filter; // показываем выбранные
      });
    },
  },
  mounted() {
    M.FormSelect.init(this.$refs.select);
  },
};
</script>

<style lang="scss" scoped>
hr {
  margin-bottom: 24px;
}
.list-task__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card {
  position: relative;
  &-row {
    margin-bottom: 16px;
  }
  &-text {
    font-size: 20px;
    font-weight: 300;
  }
  &-description {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
  }
  &-btn-remove {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>

