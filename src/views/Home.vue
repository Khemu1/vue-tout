<script setup lang="ts">
import JobListings from "../components/JobListings.vue";
import Cards from "../components/home/Cards.vue";
import Hero from "../components/home/Hero.vue";
</script>

<template>
  <Hero />
  <Cards />
  <JobListings :limit="3" :showButton="true" />
</template>
