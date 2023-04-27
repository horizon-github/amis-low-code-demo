<template>
  <amis :schema="schema"></amis>
</template>

<script>
import Amis from "@/components/Amis";
import json from "@/assets/json/planup_user.json"

export default {
  data() {
    return {
      schema: ''
    };
  },
  beforeMount() {
    this.schema = JSON.stringify(json)
  },
  components: {
    Amis,
  },
};
</script>