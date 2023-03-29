<script>
    import Sidebar from "$lib/sidebarAccount.svelte";
    import { Heading, Hr, Spinner } from "flowbite-svelte";
</script>

<Sidebar />

<div class="ml-64 w-auto h-screen pt-4">
    <Heading tag="h1" class="text-center">Enheder</Heading>
    <Hr class="my-4 mx-auto md:my-10" width="w-48" height="h-1" />

    <div class="flex flex-col items-center pt-4">
        <Spinner size={12} />
    </div>
    <div class="text-center mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">Søger efter enheder</div>
</div>