<script>
	import Sidebar from "$lib/sidebar.svelte";
    import Alarm from "$lib/alarm.svelte";
    import Add from "$lib/Add.svelte";
    import { Heading, Hr } from 'flowbite-svelte';
</script>


<Sidebar />

<div class="ml-64 w-auto h-screen pt-4">
    <Heading tag="h1" class="text-center">Alarmer</Heading>
    <Hr class="my-4 mx-auto md:my-10" width="w-48" height="h-1"/>
    <div class="px-16 flex flex-col items-center">
        <Alarm />
        <Add />
    </div>
</div>