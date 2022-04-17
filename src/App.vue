<template>
  <div id="app">
    <NavbarMenu />
    <div class="container"><router-view /></div>
  </div>
</template>
<script>
import NavbarMenu from "@/components/NavbarMenu";
export default {
  components: { NavbarMenu },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
</style>
