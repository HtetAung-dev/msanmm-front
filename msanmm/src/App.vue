<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "APP",
  mounted() {
    // Add a global event listener to track user activity
    //window.addEventListener('mousemove', this.handleUserActivity);
    //window.addEventListener('keydown', this.handleUserActivity);
  },
  beforeUnmount() {
    // Remove the event listeners when the component is unmounted
    //window.removeEventListener('mousemove', this.handleUserActivity);
    //window.removeEventListener('keydown', this.handleUserActivity);
  },
  methods: {
    handleUserActivity() {
      // Call this method to reset the auto-logout timer
      this.$store.dispatch('resetAutoLogoutTimer');
    },

  }
}
</script>