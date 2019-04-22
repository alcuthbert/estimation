<template>
    <b-table
        bordered
        hover
        selectable
        select-mode="single"
        selectedVariant="warning"
        :items="items"
        :fields="fields"
        >
    </b-table>
</template>

<script>
export default {
    data() {
        return {
            fields: [
                "id",
                "subtaskId",
                "type",
                "estimator",
                "dvk",
                "imp",
                "e_test",
                "e_test_tech"
            ]
        }
    },
    props: ['items']
}
</script>
