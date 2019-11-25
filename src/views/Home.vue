<template>
  <div class="home">
    <HelloWorld :msg="msg" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: process.env.VUE_APP_MSG,
      test: "tesafasdft"
    };
  }
};
</script>
