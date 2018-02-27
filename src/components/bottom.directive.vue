<template>
    <nav class="wx-bottom">
        <div v-for="nav in data" v-bind:class="nav.active">
            <a v-bind:href="nav.url" v-bind:md="nav.md" v-bind:md_name="nav.md_name">
                <img v-bind:src="nav.icon" />
                <p v-bind:class="nav.cls">{{nav.title}}</p>
            </a>
        </div>
    </nav>
</template>

<script type="text/javascript">
    export default {
        data() {
            let nav = this['dataNav'] || {};
            let def = this['default'] || 0;
            let mou = nav['moudle'] + nav['color'][0];
            let conf = {},
                data = nav.nodeList || [];
            data.forEach(function (d, i) {
                d.icon = d.icon.split(',');
                if (def == i) {
                    d.active = 'active';
                    d.icon = d.icon[1].replace(/\?key\=/g, mou+'\/');
                } else {
                    d.icon = d.icon[0].replace(/\?key\=/g, mou+'\/');
                }
            });
            return {
                conf: conf,
                data: data
            }
        },
        props: ['default', 'dataNav']
    }
</script>
<style type="text/css" lang="less">
    .wx-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 105px;
        box-sizing: border-box;
        display: -webkit-box;
        display: box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-around;
        -webkit-box-pack: center;
        -ms-flex-pack: distribute;
        -ms-flex-align: center;
        -ms-flex-line-pack: center;
        -webkit-box-align: center;
        div {
            text-align: center;
            img {
                width: 40px;
                height: 40px;
                margin: 10px;
            }
            p {
                position: relative;
                font-size: 20px;
            }
        }
    }
</style>
