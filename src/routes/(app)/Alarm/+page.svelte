<script lang="ts">
  import {
    Heading,
    Hr,
    Modal,
    Checkbox,
    Button,
  } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import { invalidateAll } from "$app/navigation";
  import { DatePicker, DatePickerInput } from 'carbon-components-svelte';

  export let data: PageData;
  let add = false;

  let mon = false;
  let tue = false;
  let wed = false;
  let thu = false;
  let fri = false;
  let sat = false;
  let sun = false;
  $: dateDisable = mon || tue || wed || thu || fri || sat || sun;

  const weekdays = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];
  let day = ["0", "0", "0", "0", "0", "0", "0"];

  const del = async (e: number) => {
    const response = await fetch("/Alarm", {
      method: "POST",
      body: JSON.stringify({ e }),
      headers: {
        headermessage: "delete",
      },
    });

    invalidateAll();

    return response;
  };
</script>

<Heading tag="h1" class="text-center">Alarmer</Heading>
<Hr class="my-4 mx-auto md:my-10" width="w-48" height="h-1" />
<div class="px-16 flex flex-col items-center">
  {#each data.row as alarms}
    <div
      class="border p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 shadow dark:border-gray-700 flex flex-row w-full mb-6"
    >
      <div class="flex flex-col justify-center w-32 h-16 border-r">
        <Heading
          tag="h3"
          class="text-center w-full border-gray-200 dark:border-gray-700 pr-6 mr-6"
        >
          {alarms.time.getHours().toString().length === 2
            ? alarms.time.getHours()
            : "0" + alarms.time.getHours()}:{alarms.time
            .getMinutes()
            .toString().length === 2
            ? alarms.time.getMinutes()
            : "0" + alarms.time.getMinutes().toString()}
        </Heading>
      </div>
      <div class="w-full ml-6 flex flex-row space-x-6">
        {#each day as day, i}
          <script>
          if (alarms.recurring) {
            for (i: number; i < 8; i++) {
              day[i] = alarms.days[i];
            }
          }
          </script>
          <div class="font-medium mt-4">
            {#if alarms.recurring}
              {#if alarms.days[i + 1] === "1"}
                <span class="text-blue-400 cursor-pointer">{weekdays[i]}</span
                >
              {:else}
                <span class="dark:text-gray-300 text-gray-700 cursor-pointer"
                  >{weekdays[i]}</span
                >
              {/if}
            {:else}
              <span class="dark:text-gray-300 text-gray-700 cursor-pointer"
                >{weekdays[i]}</span
              >
            {/if}
          </div>
        {/each}
      </div>
      <div class="flex md:flex-col">
        <a href={"/Alarm/[" + alarms.id + "]"}
          ><button
            ><svg
              class="w-6 h-6 dark:fill-slate-200"
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              width="48"
              ><path
                d="M479.858 896Q460 896 446 881.858q-14-14.141-14-34Q432 828 446.142 814q14.141-14 34-14Q500 800 514 814.142q14 14.141 14 34Q528 868 513.858 882q-14.141 14-34 14Zm0-272Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm0-272Q460 352 446 337.858q-14-14.141-14-34Q432 284 446.142 270q14.141-14 34-14Q500 256 514 270.142q14 14.141 14 34Q528 324 513.858 338q-14.141 14-34 14Z"
              /></svg
            ></button
          ></a
        >
        <button class="md:mt-auto" on:click={del(alarms.id)}
          ><svg
            class="w-6 h-6 dark:fill-slate-200"
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 96 960 960"
            width="48"
            ><path
              d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"
            /></svg
          ></button
        >
      </div>
    </div>
  {/each}
  <Button on:click={() => (add = true)}>Tilføj Alarm!</Button>
</div>

<Modal open={add} size="lg">
  <form method="POST" class="flex flex-col">
    <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0 mb-6">
      Lav en alarm
    </h3>
    <div class="mb-6">
      <label
        for="tid"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Tid</label
      >
      <input
        type="time"
        name="tid"
        class="rounded-xl text-center w-72 dark:bg-gray-700 border-gray-600 cursor-pointer"
      />
    </div>
    <div class="mb-6">
        <label
        for="datepick"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Dag</label
      >
      <DatePicker datePickerType="single" dateFormat="d/m/Y">
        <DatePickerInput bind:disabled={dateDisable} name="datepick" placeholder="dd/mm/åååå" class="w-full mx-0 rounded-xl text-center dark:bg-gray-700 cursor-pointer dark:text-gray-400" />
      </DatePicker>
    </div>
    <div class="mb-6 flex flex-row space-x-6 w-full">
      <Checkbox bind:checked={mon} custom name="mon">
        <span
          class="peer-checked:text-blue-400 dark:text-gray-300 text-gray-700 cursor-pointer"
          >Man</span
        >
      </Checkbox>
      <Checkbox bind:checked={tue} custom name="tue">
        <span
          class="peer-checked:text-blue-400 dark:text-gray-300 text-gray-700 cursor-pointer"
          >Tir</span
        >
      </Checkbox>
      <Checkbox bind:checked={wed} custom name="wed">
        <span
          class="peer-checked:text-blue-400 dark:text-gray-300 text-gray-700 cursor-pointer"
          >Ons</span
        >
      </Checkbox>
      <Checkbox bind:checked={thu} custom name="thu">
        <span
          class="peer-checked:text-blue-400 dark:text-gray-300 text-gray-700 cursor-pointer"
          >Tor</span
        >
      </Checkbox>
      <Checkbox bind:checked={fri} custom name="fri">
        <span
          class="peer-checked:text-blue-400 dark:text-gray-300 text-gray-700 cursor-pointer"
          >Fre</span
        >
      </Checkbox>
      <Checkbox bind:checked={sat} custom name="sat">
        <span
          class="peer-checked:text-blue-400 dark:text-gray-300 text-gray-700 cursor-pointer"
          >Lør</span
        >
      </Checkbox>
      <Checkbox bind:checked={sun} custom name="sun">
        <span
          class="peer-checked:text-blue-400 dark:text-gray-300 text-gray-700 cursor-pointer"
          >Søn</span
        >
      </Checkbox>
    </div>
    <input
      type="submit"
      value="Lav alarm!"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full cursor-pointer"
    />
  </form>
</Modal>
