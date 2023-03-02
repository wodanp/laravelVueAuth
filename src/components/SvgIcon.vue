<script setup lang="ts">
const props = withDefaults(defineProps<{
    svg: string,
    size?: number,
    fill?: string,
    class?: string
}>(), {
    size: 24,
    fill: 'currentColor',
    class: ''
})
</script>

<template>
    <svg aria-hidden="true" :fill="props.fill" :width="size" :height="size" :class="class">
        <use :xlink:href="`#svg-${props.svg}`" />
    </svg>
</template>


image.png