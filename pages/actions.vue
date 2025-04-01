<template>
    <Header v-if="$route.path !== '/actions/home'" />
    <NuxtPage />
    <Footer />
</template>
