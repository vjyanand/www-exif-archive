<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 max-w-5xl mx-auto my-4 py-4 px-8 gap-10">
    <div class="container flex flex-col items-center p-2 w-full md:w-50 md:h-50 rounded-md">
      <img class="h-28 filter-blue" src="/assets/img/secure.svg" alt="secure_logo">
      <h2 class="text-xl font-bold my-2">Secure</h2>
      <p class="font-inter text-md text-gray-700 mb-2 text-center">
        Runs in a secure sandboxed environment, safeguarding confidential financial data by limiting access and preventing potential threats.
      </p>
    </div>

    <div class="container flex flex-col items-center p-2 w-full md:w-50 md:h-50 rounded-md">
      <img class="h-28 filter-blue" src="/assets/img/offline.svg" alt="offline_logo">
      <h2 class="text-xl font-bold my-2">Offline</h2>
      <p class="font-inter text-md text-gray-700 mb-2 text-center">
        PDFs stay on your device for faster, secure conversion with no risk of data leakage, prioritizing the privacy of sensitive information.
      </p>
    </div>

    <div class="container flex flex-col items-center p-2 w-full md:w-50 md:h-50 rounded-md">
      <img class="h-28 filter-blue" src="/assets/img/accurate.svg" alt="accurate_logo">
      <h2 class="text-xl font-bold my-2">Accurate</h2>
      <p class="font-inter text-md text-gray-700 mb-2 text-center">
        We're continually improving our algorithms. If a file doesn't convert to your expectations, <a href="mailto:help@pdftableconvert.com">email us</a> and we'll fix it.
      </p>
    </div>
  </div>
</template>
<style scoped>
.filter-blue {
  filter: invert(22%) sepia(93%) saturate(1957%) hue-rotate(189deg) brightness(90%) contrast(87%);
}
</style>