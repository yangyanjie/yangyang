<template>
	<div class="win-list">
        <sa-page-load ishow="1"></sa-page-load>
		<div class="no-list" v-if="winList.length == 0">
            <img src="./img/no-list.jpg">
        </div>
        <div class="list-view" v-if="winList.length > 0">
            <div class="list-top">
                <div class="win-time">{{winTimeStr}}</div>
            </div>
            <div class="list-box" v-if="winList.length > 0">
                <div class="list-data" :key="winItem.region" v-for="winItem in winList">
                    <div class="win-city">【{{winItem.region}}】</div>
                    <ul>
                        <li v-for="spanItem in winItem.list" :key="spanItem.nickname">
                            <span class="">{{spanItem.awardName}}：</span><span>{{spanItem.nickname}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="list-bottom"></div>
        </div>
	</div>

</template>
<script type="text/javascript">
    import SaPageLoad from 'components/pageload.directive'
    import Lib from "assets/js/Lib.js";
    const waitTime = 60000
    export default {
        data() {
            return {
                winList: [1],
                winTimeStr: '', 
            }
        },
        components: {
            SaPageLoad
        },
        methods: {
            getServerTime(){
                let that = this
                Lib.ajax({
                    url: "/memberDay/getServerTime",
                    success: result => {
                        if(result.ok){
                            let drawTime = parseInt(result.drawTime) + waitTime;
                            let nowTime = parseInt(result.systemTime);
                            if(drawTime <= nowTime){
                                that.getWinList(1);
                            }else{
                                that.getWinList(2);
                            } 
                        }
                    },
                    error: err => {
                    
                    }
                });
            },
            getWinList(type){
                Lib.ajax({
                    url: "/memberDay/getAllWinningList",
                    data: {
                        winningType: type
                    },
                    success: result => {
                        if(result.ok){
                            this.winTimeStr = result.winningTime
                            this.normalizeWinList(result.data) 
                        }
                    },
                    error: err => {
                    
                    }
                });
            },
            normalizeWinList(winList) {
                let winArr = [];
                if(winList.length > 0){
                    var result = {};
                    winList.forEach(function (d) {
                        if (result.hasOwnProperty(d.region.substring(3))) {
                            result[d.region.substring(3)].push(d);
                        } else {
                            result[d.region.substring(3)] = [d];
                        }
                    });
                    for(var key in result){
                        let winItem = {
                            region : key,
                            list : result[key]
                        }
                        winArr.push(winItem);
                    }
                }
                this.winList = winArr;
            }
            
        },
        created() {
            this.getServerTime()
        }
    };
</script>
<style type="text/css" lang="less">
    .no-list{
        height: 100%;
        width: 100%;
        overflow: scroll;
        position: absolute;
        img{
            width: 100%;
            height: auto;
        }
    }
    .list-view{
        .list-top{
            position: relative;
            width: 750px;
            height: 417px;
            background-image: url(./img/list-top.jpg);
            background-size: contain;
            background-repeat: no-repeat;
            .win-time{
                position: absolute;
                width: 100%;
                text-align: center;
                font-size: 45px;
                color: #fafbc8;
                top: 360px;
            }
        }
        .list-box{
            min-height: 300px;
            .list-data{
                .win-city{
                    width: 100%;
                    text-align: center;
                    font-size: 40px;
                    color: red;
                    margin-bottom: 15px;
                }
                
                ul {
                    margin-bottom: 60px;
                    li{
                        text-align: center;
                        margin-bottom: 30px;
                        span{
                            font-size: 35px;
                            color: #444;
                        }
                    }
                }
            }
        }
        >div:nth-of-type(2){
            margin-top: 70px;
        }
        
        .list-bottom{
            position: relative;
            width: 750px;
            height: 218px;
            background-image: url(./img/list-bottom.jpg);
            background-size: cover;
            background-repeat: no-repeat;
        }
    }
    
</style>