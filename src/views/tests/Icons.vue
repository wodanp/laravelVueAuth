<script setup lang="ts"></script>

<template>
    <h1>icons</h1>
    <el-space mb-2>
        <SvgIcon svg="tabler-user" />

        <i-ep-add-location />
        <i-ep-aim />

        <el-button>
            Hello world
            <template #icon><i-ep-circle-check-filled /></template>
        </el-button>

        <el-button>
            <template #icon><i-ep-circle-check-filled /></template>
            Hello world
        </el-button>

        <el-button>
            <SvgIcon svg="tabler-user" />
            Hello world
            <SvgIcon svg="tabler-user" />
        </el-button>

        <el-input />


    </el-space>
</template>