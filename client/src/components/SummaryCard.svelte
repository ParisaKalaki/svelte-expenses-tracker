<script>
export let value = 0;
export let mode = "balance";

$: label = mode.toUpperCase();
$: cssClass = getCssClass(mode);

function getCssClass(mode) {
    switch (mode) {
        case "balance":
            return "is-info"
        case "income":
            return "is-danger"
        case "expernses":
            return "is-danger";
    }
}
</script>

<div class="notification is-info is-light has-text-centerd">
    {label}:  <strong>{value}</strong>
</div>
