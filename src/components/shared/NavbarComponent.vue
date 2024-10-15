<template>
  <div>
    <PMenubar :model="items">
      <template #end>
        <PButton icon="pi pi-user" @click="goToProfile" class="p-button-text" />
        <PButton icon="pi pi-cog" @click="goToSettings" class="p-button-text" />
      </template>
    </PMenubar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    command: () => {
      router.push('/')
    },
  },
  {
    label: 'Properties',
    icon: 'pi pi-fw pi-building',
    command: () => {
      router.push('/properties')
    },
  },
  {
    label: 'Contact',
    icon: 'pi pi-fw pi-envelope',
    command: () => {
      /* Logic for Contact */
    },
  },
])

const goToProfile = () => {
  router.push('/profile') // Add your profile route here
}

const goToSettings = () => {
  router.push('/settings') // Add your settings route here
}
</script>

<style scoped>
/* Add your styles here if needed */
</style>
