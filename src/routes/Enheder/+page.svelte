<script lang="ts">
  import type { PageData } from "./$types";
  import Sidebar from "$lib/sidebarAccount.svelte";
  import {
    Heading,
    Hr,
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell,
  } from "flowbite-svelte";
  import { invalidateAll } from "$app/navigation";

  export let data: PageData;

  const call = async (e: string, del: string) => {
    const response = await fetch("/Enheder", {
      method: "POST",
      body: JSON.stringify({ e }),
      headers: { headerMessage: del },
    });

    invalidateAll();

    return response;
  };
</script>

<Sidebar />

<div class="md:ml-64 w-auto h-auto pt-4">
  <Heading tag="h1" class="text-center">Enheder</Heading>
  <Hr class="my-4 mx-auto md:my-10" width="w-48" height="h-1" />
  <div class="mx-96">
    <div class="text-left mb-2">
      <Heading tag="h3">Dine devices</Heading>
    </div>
    <Table hoverable={true} shadow>
      <TableHead>
        <TableHeadCell class="w-96">Device id</TableHeadCell>
        <TableHeadCell>Afbryd forbindelse</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each data.connected as device}
          <TableBodyRow>
            <TableBodyCell
              tdClass="px-6 py-4 whitespace-nowrap font-medium w-96"
              >{device.id}</TableBodyCell
            >
            <TableBodyCell>
              <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                on:click={call(device.id, "1")}>Afbryd forbindelse!</button
              >
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
    <br />
    <br />
    <br />
    <div class="mb-2 text-left">
      <Heading tag="h3">Tilgænglige devices</Heading>
    </div>
    <Table hoverable={true} shadow>
      <TableHead>
        <TableHeadCell class="w-96">Device id</TableHeadCell>
        <TableHeadCell>Forbind</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each data.available as device}
          <TableBodyRow>
            <TableBodyCell
              tdClass="px-6 py-4 whitespace-nowrap font-medium w-96"
              >{device.id}</TableBodyCell
            >
            <TableBodyCell>
              <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                on:click={call(device.id, "0")}>Forbind!</button
              >
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>
</div>
