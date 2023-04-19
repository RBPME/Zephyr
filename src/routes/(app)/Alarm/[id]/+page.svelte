<script lang="ts">
  import { Heading, Hr, Checkbox } from "flowbite-svelte";
  import 'carbon-components-svelte/css/white.css';
  import { DatePicker, DatePickerInput } from 'carbon-components-svelte';
  import type { PageData } from "./$types";

  export let data: PageData;

  let mon = false;
  let tue = false;
  let wed = false;
  let thu = false;
  let fri = false;
  let sat = false;
  let sun = false;

  $: disableDate = mon || tue || wed || thu || fri || sat || sun;
</script>

<Heading tag="h1" class="text-center">Alarmer</Heading>
<Hr class="my-4 mx-auto md:my-10" width="w-48" height="h-1" />
<div class="px-16 flex flex-col items-center">
  {#each data.row as alarms}
    <div
      class="border p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 shadow dark:border-gray-700 flex flex-row w-full mb-6"
    >
      {#if alarms.id.toString() == data.editid.slice(1, 3)}
        <form method="post" class="flex flex-row w-full">
          <div class="flex flex-col justify-center w-32 h-16 border-r">
            <Heading
              tag="h3"
              class="text-center w-full border-gray-200 dark:border-gray-700 pr-6 mr-6"
            >
              <input
                type="time"
                class="rounded-xl text-center w-full dark:bg-gray-700 border-gray-600 cursor-pointer"
                name="tid"
                value={(alarms.time.getHours().toString().length === 2
                  ? alarms.time.getHours().toString()
                  : "0" + alarms.time.getHours()) +
                  ":" +
                  (alarms.time.getMinutes().toString().length === 2
                    ? alarms.time.getMinutes().toString()
                    : "0" + alarms.time.getMinutes().toString())}
              />
            </Heading>
          </div>
          <div class="w-full ml-6 flex flex-row space-x-6">
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
          <div class="mr-16 pt-3">
            <DatePicker datePickerType="single" dateFormat="d/m/Y">
              <DatePickerInput bind:disabled={disableDate} name="datepick" placeholder="dd/mm/åååå" class="rounded-xl text-center dark:bg-gray-700 cursor-pointer dark:text-gray-400" />
            </DatePicker>
          </div>
          <div class="flex md:flex-col">
            <button type="submit"
              ><svg
                class="w-6 h-6 dark:fill-slate-200"
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
                ><path
                  d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z"
                /></svg
              ></button
            >
          </div>
        </form>
      {:else}
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
        <div class="w-full ml-6 flex flex-row" />
      {/if}
    </div>
  {/each}
</div>
