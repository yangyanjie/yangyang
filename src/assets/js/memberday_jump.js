/**
 * Author: hanzha
 * Create Date: 2017-01-12
 * Description: 会员日跳转逻辑
 */
import Lib from './Lib.js'

let memberJump = {
  isTime: function(callback){
    console.log('isTime调用了哦')
    Lib.ajax({
      url:"/memberDay/getServerTime",
      success: res => {
        if (res.ok) {
          var that = this;
          //服务器时间；
          this.serverTime = res.systemTime;
          //活动开始时间；
          this.activityStart = res.drawTime;

          // 1.29-2.18临时跳转到维护页面
          this.currentMonth = new Date(this.serverTime).getMonth() + 1; // 月
          this.currentNo = new Date(this.serverTime).getDate(); // 日
          if((this.currentMonth == 1 && this.currentNo >= 29) || (this.currentMonth == 2 && this.currentNo <= 18)) {
            // 跳转
            window.location.href = window.location.origin + "/app-hebei/views/activity/system-service.html?t="+new Date().getTime()
          }


          this.currentDay = new Date(this.serverTime).getDay();
          this.currentHour = new Date(this.serverTime).getHours();
          this.currentMinute = new Date(this.serverTime).getMinutes();
          this.currentSecond = new Date(this.serverTime).getSeconds();

          this.startDay = new Date(this.activityStart).getDay();
          this.startHour = new Date(this.activityStart).getHours();
          this.startMinute = new Date(this.activityStart).getMinutes();
          console.log('时间')
          console.log(this.currentDay,this.currentHour,this.currentMinute,this.currentSecond,this.startDay,this.startHour,this.startMinute);
          var now = new Date();

          //处理时间的逻辑判断
          if(this.currentDay === this.startDay && this.currentHour === this.startHour) {//是周六晚八点；
            if(this.currentMinute >= this.startMinute && this.currentMinute < (this.startMinute+1)){ //晚8:30到31跳到抽奖页
              // 跳转
              window.location.href = window.location.origin + "/app-hebei/views/activity/member-day.html?t="+new Date().getTime()
            }else if(this.currentMinute < this.startMinute) {
              //发获取服务器时间的请求；
              this.serverTimer = setInterval(function() {
                that.currentSecond++;

                if(that.currentSecond === 60) {
                  that.currentMinute++;
                  that.currentSecond = 0;
                }

                if(that.currentMinute === that.startMinute) {
                  // 跳转
                  window.location.href = window.location.origin + "/app-hebei/views/activity/member-day.html?t="+new Date().getTime()
                }
              },1000)
            }
          } else {
            console.log('不是周六八点半')
          }

          // 是否八点31之后到周日
          //if(this.currentDay == 0 || this.serverTime > (this.activityStart + 3600000) || (this.currentDay == this.startDay && this.currentMinute > (this.startMinute+30))) {
          //  this.isExchange = true;
          //}

          // 是否八点31之后到周日
          if(this.currentDay == 0 || (this.currentDay == this.startDay && this.currentHour > this.startHour)) {
            this.isExchange = true;
          }
          
          // 因为异步导致获取不到变量，回调一下。
          callback(this)
        }
      },
      error: err => {
        alert(err.message);
      }
    })
  }
}

export default memberJump;






