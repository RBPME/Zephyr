<script lang="ts">
  import Sidebar from "$lib/sidebarAccount.svelte";
  import Alarm from "$lib/alarm.svelte";
  import Add from "$lib/Add.svelte";
  import { Heading, Hr } from "flowbite-svelte";
  import { invalidateAll } from "$app/navigation";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<Sidebar />

<div class="md:ml-64 w-auto pt-4">
  <Heading tag="h1" class="text-center">Alarmer</Heading>
  <Hr class="my-4 mx-auto md:my-10" width="w-48" height="h-1" />
  <div class="px-16 flex flex-col items-center">
    {#each data.row as alarms}
      <Alarm hrs={alarms.time.getHours()} min={alarms.time.getMinutes()} />
    {/each}
    <Add />
  </div>
</div>
