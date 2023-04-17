<script lang="ts">
    import type { PageData } from "./$types";
    import Sidebar from "$lib/sidebarAccount.svelte";
    import { Heading, Hr, Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell } from "flowbite-svelte";

    export let data: PageData;
</script>

<Sidebar />

<div class="md:ml-64 w-auto h-auto pt-4">
    <Heading tag="h1" class="text-center">Enheder</Heading>
    <Hr class="my-4 mx-auto md:my-10" width="w-48" height="h-1" />
    <Table class="">
        <TableHead>
            <TableHeadCell>Device Id</TableHeadCell>
            <TableHeadCell>Forbind</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each data.row as device}
                <TableBodyRow>
                    <TableBodyCell>{device.id}</TableBodyCell>
                    <TableBodyCell>
                        
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>