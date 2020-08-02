<template>
  <div>
    <hash-loader
      v-bind:loading="isLoading"
      v-bind:color="'#68d391'"
      v-bind:size="100"
    ></hash-loader>
    <px-assets-table v-bind:assets="assets" v-if="!isLoading"></px-assets-table>
  </div>
</template>

<script>
import PxAssetsTable from "@/components/PxAssetsTable";
import api from "@/api";
import { HashLoader } from "@saeris/vue-spinners";

export default {
  name: "Home",
  components: {
    PxAssetsTable,
    HashLoader
  },

  data() {
    return {
      assets: [],
      isLoading: false
    };
  },

  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then(assets => (this.assets = assets))
      .finally(() => (this.isLoading = false));
  }
};
</script>

<style scoped></style>
