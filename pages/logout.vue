<script lang="ts" setup>
const user = useUserStore();
await user.setToken(null);
location.href = "/login";
</script>
