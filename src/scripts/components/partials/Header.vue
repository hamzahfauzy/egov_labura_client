<template>
    <div class="header header-fixed header-auto-show header-logo-app" v-if="$route.name != 'Dashboard'">
        <a href="javascript:void(0)" @click="$router.go(-1)" data-back-button class="header-title header-subtitle">{{$route.meta.title}}</a>
        <a href="javascript:void(0)" @click="$router.go(-1)" data-back-button class="header-icon header-icon-1"><i class="fas fa-arrow-left"></i></a>
        <!-- <a href="#" data-toggle-theme class="header-icon header-icon-2 show-on-theme-dark"><i class="fas fa-sun"></i></a>
        <a href="#" data-toggle-theme class="header-icon header-icon-2 show-on-theme-light"><i class="fas fa-moon"></i></a>
        <a href="#" data-menu="menu-highlights" class="header-icon header-icon-3"><i class="fas fa-brush"></i></a>
        <a href="#" data-menu="menu-main" class="header-icon header-icon-4"><i class="fas fa-bars"></i></a> -->
    </div>
</template>