var App = getApp();
Page({
    data: {
        imgUrlPath: App.globalData.imgUrlPath,
        showModal: false,
        levelList: [
            { value: 0, label: '不限' },
            { value: 1, label: '民宿/客栈' },
            { value: 2, label: '经济型' },
            { value: 3, label: '高档型' },
            { value: 4, label: '豪华型'},
        ],
        searchData: {
            scenicSpot: null, //景点
            scenicSpotName: '凤凰', //景点名称
            startDate: null, 
            startDateName: null,
            endDate: null,
            endDateName: null,
            hotelName: null,
            price: '', 
            grade: null,  //0:不限 1:民宿/客栈，2：经济型，3：高档型，4：豪华型
        },
        modalData: {
            price: 0.00,
            grade: 0,  //0:不限 1:民宿/客栈，2：经济型，3：高档型，4：豪华型
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        var searchData = that.data.searchData;
        searchData = wx.getStorageSync('searchData') ? wx.getStorageSync('searchData') : searchData;
        if (!searchData.startDate && !searchData.endDate)  {
            searchData.startDate = that.getDateStr(0);
            searchData.endDate = that.getDateStr(1);
        }
        if (searchData.startDate) {
            searchData.startDateName = that.getDayName(searchData.startDate);
        }
        if (searchData.startDate) {
            searchData.endDateName = that.getDayName(searchData.endDate);
        }
        that.setData({ searchData: searchData});
        wx.setStorageSync('searchData', searchData)
    }, 
    getDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);   //获取AddDayCount天后的日期
        var year = dd.getFullYear();
        var mon = dd.getMonth() + 1; //获取当前月份的日期
        var day = dd.getDate();
        return year + "-" + mon + "-" + day;
    },
    getDayName(d) {
        var td = new Date();
        td = new Date(td.getFullYear(), td.getMonth(), td.getDate());
        var od = new Date(d);
        od = new Date(od.getFullYear(), od.getMonth(), od.getDate());
        var xc = (od - td) / 1000 / 60 / 60 / 24;
        if (xc == 0) {
            return "今天";
        } else if (xc < 2) {
            return "明天";
        } else if (xc < 3) {
            return "后天";
        } else {
            var str = "周" + "日一二三四五六".charAt(new Date(d).getDay());
            return str;
        }
    },
    onShareAppMessage: function () {

    },
    //价格等级弹框开关
    switchModal(){
        var that = this;
        var showModal = that.data.showModal;
        showModal = !showModal;
        that.setData({ showModal: showModal})
    },
    //去选景点
    gotoSelectPoint(e){
        var that = this;
        var id = e.currentTaget.dataset.id;
        if(!id) return;
        wx.navigateTo({url: '/pages/hotel/attractionsList/attractionsList?id='+id,})
    },
    bindinput(e){
        var that = this;
        var hotelName = e.detail.value;
        var searchData = that.data.searchData;
        searchData.hotelName = hotelName
        that.setData({ searchData: searchData })
    },
    selectGrade(e) {
        var that = this;
        var grade = e.currentTarget.dataset.key;
        var modalData = that.data.modalData;
        modalData.grade = grade
        that.setData({ modalData: modalData})
    },
    changeSlider(e){
        var that = this;
        var price = e.detail.value;
        var modalData = that.data.modalData;
        modalData.price = price
        that.setData({ modalData: modalData })
    },
    updataSearch(){
        var that = this;
        var searchData = that.data.searchData;
        var modalData = that.data.modalData;
        searchData.grade = modalData.grade;
        searchData.price = modalData.price;
        that.setData({ searchData: searchData })
        that.switchModal();
    },
    searchHotel(){
        var that = this;
        var searchData = that.data.searchData;
        wx.setStorageSync('searchData', searchData)
        wx.navigateTo({
            url: '/pages/hotel/booklingList/booklingList',
        })
    },
    gotoSelectDate(){
        var that = this;
        wx.navigateTo({
            url: '/pages/hotel/bookDate/bookDate',
        })
    }
})