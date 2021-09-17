<template>
  <div id="app">
    <daily-weather>
    </daily-weather>
  </div>
</template>

<script>
import DailyWeather from './components/DailyWeather.vue';

export default {
  name: 'App',
  components: {
    DailyWeather,
  },
};
</script>

<style>
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
