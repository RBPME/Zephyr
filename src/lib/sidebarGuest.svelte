<script>
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Modal, Input, Checkbox, Button, Label } from 'flowbite-svelte';
    $: activeUrl = $page.url.pathname;
    
    let login = false;
    let signup = false;
</script>

<Sidebar>
    <SidebarWrapper class="fixed w-64 h-screen top-0">
        <SidebarGroup>
            <SidebarItem label='Alarmer' href="/" active={activeUrl === '/'}>
                <svelte:fragment slot='icon'>
                    <svg class="w-6 h-6 dark:fill-slate-200" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M479 974q-74 0-139.5-28t-114-76.5q-48.5-48.5-77-114T120 615.267q0-74.733 28.5-140T225.5 361q48.5-49 114-77T479 256q74 0 139.5 28T733 361q49 49 77 114.267t28 140Q838 690 810 755.5t-77 114Q684 918 618.5 946T479 974Zm0-357Zm121 161 42-42-130-130V416h-60v214l148 148ZM214 189l42 42L92 389l-42-42 164-158Zm530 0 164 158-42 42-164-158 42-42ZM479.043 914Q604 914 691 826.957t87-212Q778 490 690.957 403t-212-87Q354 316 267 403.043t-87 212Q180 740 267.043 827t212 87Z"/></svg>
                </svelte:fragment>
            </SidebarItem>

            <SidebarItem label='Enheder'>
                <svelte:fragment slot="icon">
                    <svg class="w-6 h-6 dark:fill-slate-200" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M234 1016q-47.5 0-80.75-33.25T120 902q0-47.5 33.25-80.75T234 788q14 0 24.5 2.5T280 798l85-106q-19-23-29-52.5t-5-61.5l-121-41q-15 25-39.5 39T114 590q-47.5 0-80.75-33.25T0 476q0-47.5 33.25-80.75T114 362q47.5 0 80.75 33.25T228 476v4l122 42q18-32 43.5-49t56.5-24V320q-39-11-61.5-43T366 210q0-47.5 33.25-80.75T480 96q47.5 0 80.75 33.25T594 210q0 35-23 67t-61 43v129q31 7 57 24t44 49l121-42v-4q0-47.5 33.25-80.75T846 362q47.5 0 80.75 33.25T960 476q0 47.5-33.25 80.75T846 590q-32 0-57-14t-39-39l-121 41q5 32-4.5 61.5T595 692l85 106q11-5 21.5-7.5t24.062-2.5Q774 788 807 821.25T840 902q0 47.5-33.25 80.75T726 1016q-47.5 0-80.75-33.25T612 902q0-20 5.5-36t15.5-31l-85-106q-32.127 17-68.563 17Q443 746 411 729l-84 107q10 15 15.5 30.5T348 902q0 47.5-33.25 80.75T234 1016ZM114.035 530Q137 530 152.5 514.465q15.5-15.535 15.5-38.5T152.465 437.5q-15.535-15.5-38.5-15.5T75.5 437.535Q60 453.07 60 476.035T75.535 514.5q15.535 15.5 38.5 15.5Zm120 426Q257 956 272.5 940.465q15.5-15.535 15.5-38.5T272.465 863.5q-15.535-15.5-38.5-15.5T195.5 863.535q-15.5 15.535-15.5 38.5t15.535 38.465q15.535 15.5 38.5 15.5Zm246-692Q503 264 518.5 248.465q15.5-15.535 15.5-38.5T518.465 171.5q-15.535-15.5-38.5-15.5T441.5 171.535q-15.5 15.535-15.5 38.5t15.535 38.465q15.535 15.5 38.5 15.5Zm.465 422q37.5 0 63.5-26.5t26-64q0-37.5-26.1-63.5T480 506q-37 0-63.5 26.1T390 596q0 37 26.5 63.5t64 26.5Zm245.535 270Q749 956 764.5 940.465q15.5-15.535 15.5-38.5T764.465 863.5q-15.535-15.5-38.5-15.5T687.5 863.535q-15.5 15.535-15.5 38.5t15.535 38.465q15.535 15.5 38.5 15.5Zm120-426Q869 530 884.5 514.465q15.5-15.535 15.5-38.5T884.465 437.5q-15.535-15.5-38.5-15.5T807.5 437.535q-15.5 15.535-15.5 38.5t15.535 38.465q15.535 15.5 38.5 15.5ZM480 210ZM114 476Zm366 120Zm366-120ZM234 902Zm492 0Z"/></svg>
                </svelte:fragment>
            </SidebarItem>
        </SidebarGroup>

        <SidebarGroup border>
            <SidebarItem label='Log In' on:click={() => login = true}>
                <svelte:fragment slot="icon">
                    <svg class="w-6 h-6 dark:fill-slate-200" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M489 936v-60h291V276H489v-60h291q24 0 42 18t18 42v600q0 24-18 42t-42 18H489Zm-78-185-43-43 102-102H120v-60h348L366 444l43-43 176 176-174 174Z"/></svg>
                </svelte:fragment>
            </SidebarItem>

            <SidebarItem label="Sign Up" on:click={() => signup = true}>
                <svelte:fragment slot="icon">
                    <svg class="w-6 h-6 dark:fill-slate-200" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M730 656V526H600v-60h130V336h60v130h130v60H790v130h-60Zm-370-81q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40 896v-94q0-35 17.5-63.5T108 696q75-33 133.338-46.5 58.339-13.5 118.5-13.5Q420 636 478 649.5 536 663 611 696q33 15 51 43t18 63v94H40Zm60-60h520v-34q0-16-9-30.5T587 750q-71-33-120-43.5T360 696q-58 0-107.5 10.5T132 750q-15 7-23.5 21.5T100 802v34Zm260-321q39 0 64.5-25.5T450 425q0-39-25.5-64.5T360 335q-39 0-64.5 25.5T270 425q0 39 25.5 64.5T360 515Zm0-90Zm0 411Z"/></svg>
                </svelte:fragment>
            </SidebarItem>
        </SidebarGroup>
    </SidebarWrapper>
</Sidebar>

<Modal bind:open={login} size="xs" autoclose={false} class="w-full">
    <form action="#" class="flex flex-col space-y-6">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Log ind</h3>
        <Label class="space-y-2">
            <span>Email</span>
            <Input type="email" name="login-email" placeholder="navn@mail.com" required />
        </Label>
        <Label class="space-y-2">
            <span>Password</span>
            <Input type="password" name="login-password" placeholder="••••••••••" required />
        </Label>
        <div class="flex items-start">
            <Checkbox>Husk mig</Checkbox>
            <a href="/" class="ml-auto text-sm text-blue-700 dark:text-blue-500 hover:underline">Glemt password?</a>
        </div>
        <Button type="submit" class="w-full">Log Ind på din konto</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Har du ikke en konto? <a href="/" class="text-blue-700 dark:text-blue-500 hover:underline" on:click={() => {signup = true; login = false;}}>Lav en her</a>
        </div>
    </form>
</Modal>

<Modal bind:open={signup} size="xs" autoclose={false} class="w-full">
    <form action="#" class="flex flex-col space-y-6">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Lav en konto</h3>
        <Label class="space-y-2">
            <span>Email</span>
            <Input type="email" name="signup-email" placeholder="navn@mail.com" required />
        </Label>
        <Label class="space-y-2">
            <span>Brugernavn</span>
            <Input name="signup-username" placeholder="Dit navn" required />
        </Label>
        <Label class="space-y-2">
            <span>Password</span>
            <Input type="password" name="signup-password" placeholder="••••••••••" required />
        </Label>
        <Label class="space-y-2">
            <span>Bekræft password</span>
            <Input type="password" name="repeat-password" placeholder="••••••••••" required />
        </Label>
        <div class="flex items-start">
            <Checkbox>Husk mig</Checkbox>
        </div>
        <Button type="submit" class="w-full">Lav din konto</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Har du allerede en konto? <a href="/" class="text-blue-700 dark:text-blue-500 hover:underline" on:click={() => {signup = false; login = true;}}>Log ind her</a>
        </div>
    </form>
</Modal>