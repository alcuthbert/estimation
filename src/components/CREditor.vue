<template>
    <div>
        <h1>CR editor {{foo}} {{cr}}</h1>
    </div>
    <!-- <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            This is the default tile! CR editor
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
          </slot>
        </header>

        <section class="modal-body" id="modalDescription">
          <div>{{cr}} {{foo}}</div>
          <slot name="body">
            I'm the default body!
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            I'm the default footer!

            <button type="button" class="btn-green" @click="close" aria-label="Close modal" >
              Close me!
            </button>
          </slot>
        </footer>
      </div>
    </div> -->
</template>

<script>
export default {
    props: {
        cr: Object,
        foo: String
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>
