<template>
  <nav class="app-nav">
    <div>
      <router-link to="/">Home</router-link>
    </div>
    <div>
      <router-link to="/about">About</router-link>
    </div>
  </nav>
</template>


<style>
.app-nav {
  display: flex;
  width: "100%";
  background-color: antiquewhite;
  align-items: center;
  justify-content: space-around;
  padding: 1em;
}
</style>