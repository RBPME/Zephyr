<script>
  import '../../app.css';

  import { DarkMode } from 'flowbite-svelte';

  let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2 md:mt-64 absolute top-4 right-4 md:top-auto md:right-auto md:bottom-4 md:left-4';
</script>

<slot />
<DarkMode {btnClass}/>