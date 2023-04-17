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
  console.log(data);

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
  <Table>
    <TableHead>
      <TableHeadCell>Device id</TableHeadCell>
      <TableHeadCell>Afbryd forbindelse</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each data.connected as device}
        <TableBodyRow>
          <TableBodyCell>{device.id}</TableBodyCell>
          <TableBodyCell>
            <button on:click={call(device.id, "1")}>Afbryd forbindelse!</button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  <br />
  <br />
  <br />
  <Table class="">
    <TableHead>
      <TableHeadCell>Device id</TableHeadCell>
      <TableHeadCell>Forbind</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each data.available as device}
        <TableBodyRow>
          <TableBodyCell>{device.id}</TableBodyCell>
          <TableBodyCell>
            <button on:click={call(device.id, "0")}>Forbind!</button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>
