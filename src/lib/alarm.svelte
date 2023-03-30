<script>
    import { Skeleton, Heading } from "flowbite-svelte";
</script>

<div class="border p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 shadow dark:border-gray-700 flex flex-row w-full">
    <div class="flex flex-col justify-center w-32 border-r">
        <Heading tag="h3" class="text-center w-full border-gray-200 dark:border-gray-700 pr-6 mr-6">
            06:45
        </Heading>
    </div>
    <div class="w-full ml-6">
        <Skeleton />
    </div>
    <div class="flex flex-col">
        <button><svg class="w-6 h-6 dark:fill-slate-200" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M479.858 896Q460 896 446 881.858q-14-14.141-14-34Q432 828 446.142 814q14.141-14 34-14Q500 800 514 814.142q14 14.141 14 34Q528 868 513.858 882q-14.141 14-34 14Zm0-272Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm0-272Q460 352 446 337.858q-14-14.141-14-34Q432 284 446.142 270q14.141-14 34-14Q500 256 514 270.142q14 14.141 14 34Q528 324 513.858 338q-14.141 14-34 14Z"/></svg></button>
        <button class="mt-auto"><svg class="w-6 h-6 dark:fill-slate-200" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg></button>
    </div>
</div>