<template>
  <footer class=" bg-neutral-200 text-center dark:bg-white w-full border-t border-gray-300 py-1 md:h-11">
    <div class="flex items-center justify-between text-center container mb-0 mx-auto max-w-5xl py-2 px-8">
      <small class="text-neutral-800 dark:text-neutral-400">Copyright © 2024 Vijay Anand.</small>
      <small class="font-lato flex space-x-2 text-blue-600 dark:text-blue-900">
        <RouterLink class="hover:underline" to="/terms">
          Terms
        </RouterLink>
        <span class="text-neutral-900">|</span>
        <RouterLink class="hover:underline" to="/privacy">
          Privacy
        </RouterLink>
        <span class="text-neutral-900">|</span>
        <RouterLink class="hover:underline" to="/help">
          Help
        </RouterLink>
      </small>
    </div>
  </footer>
</template>