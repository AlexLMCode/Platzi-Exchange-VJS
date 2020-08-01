<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span>Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="asset in assets"
        v-bind:key="asset.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            v-bind:src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            v-bind:alt="asset.name"
            class="w-12 h-12"
          />
        </td>
        <td>
          <b>#{{ asset.rank }}</b>
        </td>
        <td>
          <router-link
            v-bind:to="{ name: 'coin-detail', params: { id: asset.id } }"
            class="hover:underline text-green-600"
          >
            {{ asset.name }}
          </router-link>
          <small class="ml-1 text-gray-500">
            {{ asset.symbol }}
          </small>
        </td>
        <td>{{ dollarFilter(asset.priceUsd) }}</td>
        <td>{{ dollarFilter(asset.marketCapUsd) }}</td>
        <td
          v-bind:class="
            asset.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ percentFilter(asset.changePercent24Hr) }}
        </td>
        <td class="hidden sm:block">
          <px-button v-on:click="goToCoin(asset.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import numeral from "numeral";
import PxButton from "@/components/PxButton";

export default {
  name: "PxAssetsTable",
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },

  components: {
    PxButton
  },

  methods: {
    goToCoin(id) {
      this.$router.push({ name: "coin-detail", params: { id } });
    },
    dollarFilter(value) {
      if (!value) {
        return "$ 0";
      } else {
        return numeral(value).format("($0.00a)");
      }
    },

    percentFilter(value) {
      if (!value) {
        return "0%";
      } else {
        return `${Number(value).toFixed(2)}%`;
      }
    }
  }
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
