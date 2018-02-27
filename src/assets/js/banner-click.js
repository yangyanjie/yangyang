const t = new Date().getTime();
let Bclick = function(params) {
    if(params.firstScan) {
        if (params.selfScan) {
            if(params.awardUser === null || params.awardUser === "") {
                switch (params.activityForm)
                {
                    case "act-2":
                        window.location.href = '../activity/piaoliuping.html?activityCode='+params.activityCode+'&t'+t
                    case "act-5":
                       window.location.href = '../activity/jiugonge.html?activityCode='+params.activityCode+'&t='+t
                       break;
                   case "act-9":
                       window.location.href = '../activity/dianyuanbao.html?activityCode='+params.activityCode+'&t='+t
                       break;
                   case "act-10":
                       window.location.href = '../activity/wakuang.html?activityCode='+params.activityCode+'&t='+t
                       break;
                }
            } else{
                if(params.awardUser.status ===1) {
                    alert("此二维码上次参与活动抽中的"+awardUser.prizeName+"尚未领取，请立即领取");
                } else {
                    alert("一个二维码只能参加一次活动，不能贪心噢");
                }
            }
        }else{
            alert("此二维码的抽奖机会仅属于首扫验真用户，请您再扫一包参加抽奖吧");
        }
    } else{
         switch (params.activityForm)
         {
            case "act-2":
                window.location.href = '../activity/piaoliuping.html?activityCode='+params.activityCode+'&t'+t
            case "act-5":
               window.location.href = '../activity/jiugonge.html?activityCode='+params.activityCode+'&t='+t
               break;
           case "act-9":
               window.location.href = '../activity/dianyuanbao.html?activityCode='+params.activityCode+'&t='+t
               break;
           case "act-10":
               window.location.href = '../activity/wakuang.html?activityCode='+params.activityCode+'&t='+t
               break;
        }
    }
}
export default Bclick