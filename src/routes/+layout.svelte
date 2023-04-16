<script>
  import "../app.css";
</script>

<svelte:head>
  <script>
    if (window) {
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? window.document.documentElement.classList.add("dark")
        : window.document.documentElement.classList.remove("dark");
    }
  </script>
</svelte:head>

<slot />
