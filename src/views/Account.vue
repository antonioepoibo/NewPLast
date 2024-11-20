<template>
  <div>
    <h1>Account Page</h1>
    <pre>{{ session }}</pre>
  </div>
</template>

<script setup>
  // Access session as a prop
  const props = defineProps({
    session: Object
  });

  // You can access session directly
  console.log('Account session:', props.session);
</script>
