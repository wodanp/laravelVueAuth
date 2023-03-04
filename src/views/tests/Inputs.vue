<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'

//     // Label effect
//     $('input').focus(function () {

// $(this).siblings('label').addClass('activex');
// });

// // Form validation
// $('input').blur(function () {



// // label effect
// if ($(this).val().length > 0) {
//     $(this).siblings('label').addClass('active');
// } else {
//     $(this).siblings('label').removeClass('active');
// }
// });
</script>

<template>
    <el-input></el-input>
   <form>
    <div class="inputv1">
        <SvgIcon svg="tabler-mail"></SvgIcon>
        <input type="email" required>
        <label for="">Email</label>
    </div>

    <div class="inputv2">
        <label for="loginemail">Email Adderss</label>
        <input type="email" name="loginemail" id="loginemail" required>
    </div>
</form>
</template>

<style lang="sass">

.inputv1
    position: relative
    margin: 30px 0
    width: 310px
    border-bottom: 2px solid #fff
    label
        position: absolute
        top: 50%
        left: 5px
        transform: translateY(-50%)
        color: #fff
        pointer-events: none
        transition: .5s
    input
        width: 100%
        height: 50px
        background: transparent
        border: none
        outline: none
        padding:0 35px 0 5px
        color: #fff
        &:focus ~ label,
        &:valid ~ label
            top: -5px
            font-size: .75rem            
        // &[value]:not([value=""]) ~ label,
        // &:not([value=""]) ~ label

        //&:not(:empty) ~ label,
        //&[value]:not([value=""])    //https://stackoverflow.com/questions/8639282/notempty-css-selector-is-not-working

    svg
        position: absolute
        right: 8px
        color: #fff
        font-size: 1.2em
        top: 20px
        
.inputv2
    background-color: green        
</style>