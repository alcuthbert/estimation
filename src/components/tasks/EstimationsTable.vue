<template>
    <b-table
        bordered
        hover
        selectable
        select-mode="single"
        selectedVariant="warning"
        :tbody-tr-class="rowClass"
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
                {key: 'id', label: 'Id'},
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
    props: ['items'],
    methods: {
        rowClass(item) {
            if (!item) {
                return
            }

            if (item.type === 'final') {
                return 'table-success'
            }
        }
    }
}
</script>
