<template>
  <div class="landing-page">
    <header class="header header-background">
      <span class="font-bold">Welcome to Our Real Estate App</span>
      <p>Your gateway to finding your dream home!</p>
      <PButton label="Get Started" icon="pi pi-check" class="start-button" />
    </header>

    <section class="features">
      <div class="feature-cards">
        <PCard
          v-for="feature in features"
          :key="feature.title"
          class="feature-card"
        >
          <template #title>{{ feature.title }}</template>
          <template #content>
            <p class="m-0">
              {{ feature.description }}
            </p>
            <PButton label="Learn More" class="learn-more-button" />
          </template>
        </PCard>
      </div>
    </section>

    <section class="contact">
      <span class="font-bold">Contact Us</span>
      <div class="flex flex-row justify-center items-center gap-2">
        <PInputText
          v-model="name"
          placeholder="Your Name"
          class="input-field"
        />
        <PInputText
          v-model="email"
          placeholder="Your Email"
          class="input-field"
        />
      </div>
      <PButton label="Submit" icon="pi pi-send" @click="submitForm" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Feature {
  title: string
  description: string
}

const features = ref<Feature[]>([
  { title: 'Easy Search', description: 'Find your dream home with ease.' },
  {
    title: 'Affordable Prices',
    description: 'Discover homes that fit your budget.',
  },
  {
    title: 'Trusted Agents',
    description: 'Connect with real estate professionals.',
  },
])

const name = ref('')
const email = ref('')

const submitForm = () => {
  alert(`Name: ${name.value}\nEmail: ${email.value}`)
  // Handle form submission logic here
}
</script>

<style scoped>
.landing-page {
  text-align: center;
}

.header {
  font-size: large;
  background-color: #f4f4f4;
  padding: 2rem;
}

.header-background {
  background: linear-gradient(135deg, #6db3b9 0%, #b9e4c9 100%);
  padding: 20px;
  color: white;
  text-align: center;
}

.features {
  margin: 2rem 0;
}

.feature-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.feature-card {
  width: 30%;
  margin: 1rem;
}

.contact {
  margin-top: 2rem;
}
.input-field {
  margin: 0.5rem 0;
}
.start-button {
  margin-top: 1rem;
}
.learn-more-button {
  margin-top: 1rem;
}
</style>
