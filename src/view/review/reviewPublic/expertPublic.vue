<template>
    <div class="service">
        <reviewHead/>
        <div class="container deskHeader" style="height:100%">
            <div class="left-scroll">
                <div class="left_top">
                    <el-menu

                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            :default-active="this.$route.path"
                            router>

                        <el-menu-item index="/expertIndex">
                            <i class="el-icon-menu"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>

                        <el-menu-item index="/expertTodo">
                            <i class="el-icon-tickets"></i>
                            <span slot="title">待处理</span>
                        </el-menu-item>

                        <el-menu-item index="/expertReview">
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">评审中</span>
                        </el-menu-item>

                        <el-menu-item index="/expertComplete">
                            <i class="el-icon-circle-check-outline"></i>
                            <span slot="title">已完成</span>
                        </el-menu-item>
                        <el-menu-item index="/expertStopped">
                            <i class="el-icon-remove"></i>
                            <span slot="title">已中止</span>
                        </el-menu-item>
                        <el-menu-item index="/expertRejected">
                            <i class="el-icon-circle-close"></i>
                            <span slot="title">已拒绝</span>
                        </el-menu-item>
                        <el-menu-item index="/expertInformation">
                            <i class="el-icon-view"></i>
                            <span slot="title">信息维护</span>
                        </el-menu-item>


                    </el-menu>

                </div>
            </div>
            <div class="service_main clearfix">
                <router-view></router-view>
            </div>
        </div>
        <div style="clear:both"></div>
        <Footer-Index/>
    </div>
</template>
<script>
    import {mapGetters, mapMutations} from "vuex";
    import FooterIndex from "@/common/footer/footer";
    import reviewHead from "@/common/header/reviewLayout";
    // import { Menu, Submenu, MenuItem, MenuItemGroup,} from "element-ui";
    export default {
        components: {
            FooterIndex,
            reviewHead
        },
        data() {
            return {
                select: "个人信息",
                leftdataOne: [
                    {
                        name: "工具集",
                        url: "toolset",
                        open: true,
                        formindex: true
                    },
                    {
                        name: "知识广场",
                        url: "knowledgePlaza",
                        open: false,
                        formindex: false
                    }
                ]
            };
        },
        created: function () {
            this.setLeft(this.$router.currentRoute.name);
        },
        computed: {
            ...mapGetters(["getleftIndex"])
        },
        methods: {
            ...mapMutations(["setLogin", "setLeft"]),
            changeleft(item) {
                this.setLeft(item.url);
                this.$router.push(item.url);
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    };
</script>
<style lang='scss'>
    html,
    body,
    #app,
    .desk,
    .service {
        height: 100%;
    }

    .service {
        .left-scroll {
            /* text-align: center; */
            width: 11%;
            float: left;
            height: 100%;

        }

        .service_main {
            box-sizing: border-box;
            float: right;
            width: 85%;
            margin: 40px auto;
            /* &::before {
               content: "";
               display: table;
               clear: both;
             }
             h3 {
               margin-bottom: 40px;
             } */
        }
    }
</style>
