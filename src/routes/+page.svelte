<script lang="ts">
  import { Alert, Modal } from "flowbite-svelte";
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData;
  let login = true;
  let signup = false;
</script>

<Modal bind:open={login} size="xs" permanent={true} class="w-full h-min">
  <form method="POST" action="?/login" class="flex flex-col" use:enhance>
    <div class="mb-6">
      <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
        Log ind
      </h3>
    </div>
    {#if form?.invalid}
      <Alert color="red" dismissable>Alle felter skal udfyldes rigtigt.</Alert>
    {/if}
    {#if form?.credentials}
      <Alert color="red" dismissable>Brugernavn eller password er forkert.</Alert>
    {/if}
    <div class="mb-6">
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Email</label
      >
      <input
        name="email"
        type="email"
        id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Navn@email.com"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Password</label
      >
      <input
        name="password"
        type="password"
        id="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="•••••••••"
        required
      />
    </div>
    <div class="flex items-start mb-6">
      <a
        href="/"
        class="text-sm text-blue-700 dark:text-blue-500 hover:underline"
        >Glemt password?</a
      >
    </div>
    <input
      type="submit"
      value="Log ind på din konto"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
    />
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300 mt-6">
      Har du ikke en konto? <a
        href="/"
        class="text-blue-700 dark:text-blue-500 hover:underline"
        on:click={() => {
          signup = true;
          login = false;
        }}>Lav en her</a
      >
    </div>
  </form>
</Modal>

<Modal bind:open={signup} size="xs" permanent={true} class="w-full h-min">
  <form method="POST" action="?/register" class="flex flex-col" use:enhance>
    <div class="mb-6">
      <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
        Lav en konto
      </h3>
    </div>
    {#if form?.invalid}
      <Alert color="red" dismissable>Alle felter skal udfyldes rigtigt.</Alert>
    {/if}
    {#if form?.user}
      <Alert color="red" dismissable>Brugernavn er allerede i brug.</Alert>
    {/if}
    {#if form?.usedmail}
      <Alert color="red" dismissable>Email er allerede i brug.</Alert>
    {/if}
    <div class="mb-6">
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Email</label
      >
      <input
        name="email"
        type="email"
        id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Navn@email.com"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="navn"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Brugernavn</label
      >
      <input
        name="user"
        type="text"
        id="navn"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Navn"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Password</label
      >
      <input
        name="pass"
        type="password"
        id="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="•••••••••"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="confirm"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Bekræft password</label
      >
      <input
        name="confirm"
        type="password"
        id="confirm"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="•••••••••"
        required
      />
    </div>
    <input
      type="submit"
      value="Lav din konto"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
    />
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300 mt-6">
      Har du allerede en konto? <a
        href="/"
        class="text-blue-700 dark:text-blue-500 hover:underline"
        on:click={() => {
          signup = false;
          login = true;
        }}>Log ind her</a
      >
    </div>
  </form>
</Modal>