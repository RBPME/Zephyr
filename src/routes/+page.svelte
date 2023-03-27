<script>
	import Sidebar from "../lib/sidebar.svelte";
    import { Skeleton, Heading, Hr, Card } from 'flowbite-svelte'
</script>


<Sidebar />

<div class=" ml-64 w-auto h-screen">
    <Heading tag="h1" class="text-center mt-4">Alarmer</Heading>
    <Hr class="my-4 mx-auto md:my-10" width="w-48" height="h-1"/>
    <Card class="mx-12" horizontal>
        <div class="w-screen">
            <Skeleton />
        </div>
    </Card>
</div>