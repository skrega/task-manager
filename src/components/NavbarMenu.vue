<template>
  <nav class="blue-grey darken-1">
    <div class="nav-wrapper">
      <router-link class="brand-logo right" to="/">Task</router-link>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li>
          <router-link to="/" exact active-class="active">Создать</router-link>
        </li>
        <li><router-link to="/list">Список задач</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 2em;
}
</style>