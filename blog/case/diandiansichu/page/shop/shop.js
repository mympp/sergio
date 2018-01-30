var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
		goods: {
            1: {
                id:11,
                pic: 'http://p0.meituan.net/apiback/0231364d5e100b1d6d93d2c2a8d29995144408.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '黄金炸虾卷',
                sold: 102,
                price: 10
            },
            2: {
                id:21,
                pic: 'http://p0.meituan.net/xianfu/860758031fed37d9864b51b73f0574c9182368.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '吞拿鱼军舰',
                sold: 102,
                price: 10
            },
            3: {
                id:31,
                pic: 'http://p0.meituan.net/wmproduct/629763590d38e8165052d99857d29862207831.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '玉子握卷',
                sold: 102,
                price: 10
            },
            4: {
                id:41,
                pic: 'http://p1.meituan.net/xianfu/b87c438a0ce97e12357e33a80043f274245210.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '八爪鱼军舰',
                sold: 102,
                price: 10
            },
            5: {
                id:51,
                pic: 'http://p1.meituan.net/apiback/8ca566c955a373df62206776f4691ca121008.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '八爪鱼福袋',
                sold: 102,
                price: 10
            },
            6: {
                id:61,
                pic: 'http://p0.meituan.net/xianfu/f35a3ea627040ca2221e8c6687f64868413696.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '吞拿鱼福袋',
                sold: 102,
                price: 10
            },
            7: {
                id:71,
                pic: 'http://p0.meituan.net/xianfu/fdd06b68b3b46e955af4800589c12013364711.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '海草军舰',
                sold: 102,
                price: 10
            },
            8: {
                id:81,
                pic: 'http://p1.meituan.net/wmproduct/75d0ffa693b3f391f97502087a00b085182634.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '炙烧鱼蟹肉',
                sold: 102,
                price: 10
            },
            9: {
                id:91,
                pic: 'http://p0.meituan.net/xianfu/5c47526052a39f9988589888e1a28af8206882.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '玉米沙拉',
                sold: 102,
                price: 10
            },
            10: {
                id: 10,
                pic: 'http://p0.meituan.net/meismis/2ac0d7bb466f3136058efb244228dc4f63725.png%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '三拼海盗船',
                sold: 102,
                price: 10
            },
            11: {
                id: 11,
                pic: 'http://p0.meituan.net/meismis/2ac0d7bb466f3136058efb244228dc4f63725.png%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '海草福袋',
                sold: 102,
                price: 10
            },
            12: {
                id: 12,
                pic: 'http://p0.meituan.net/meismis/2ac0d7bb466f3136058efb244228dc4f63725.png%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '玉米福袋',
                sold: 102,
                price: 10
            },
            13: {
                id: 13,
                pic: 'http://p1.meituan.net/xianfu/5704307779874b88e09913f7b00eccf7395264.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '肉松军舰',
                sold: 102,
                price: 10
            },
            14: {
                id: 14,
                pic: 'http://p0.meituan.net/wmproduct/e5bffdec5f4d7160543a857cc2ae8a0c94487.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '芒果小卷',
                sold: 102,
                price: 10
            },
            15: {
                id: 15,
                pic: 'http://p1.meituan.net/apiback/0660424ae3ced0ca006fcd1f78846f8716056.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '芒果福袋',
                sold: 102,
                price: 10
            },
            16: {
                id: 16,
                pic: 'http://p1.meituan.net/wmproduct/ddfa2a44e4be5db4a86ef1c92ed91bb2192738.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '芒果蟹足肉紫菜卷',
                sold: 102,
                price: 10
            },
            17: {
                id: 17,
                pic: 'http://p0.meituan.net/wmproduct/7869521a965e910fcf155949537497ca134564.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '芝士蟹足肉',
                sold: 102,
                price: 10
            },
            18: {
                id: 18,
                pic: 'http://p1.meituan.net/xianfu/a4fc1e7c26c13f6650f962d102120c2638912.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '蛋皮紫菜包饭',
                sold: 102,
                price: 10
            },
            19: {
                id: 19,
                pic: 'http://p0.meituan.net/wmproduct/714806d32d0bee538afc50ff26a995d3168620.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '蟹籽军舰',
                sold: 102,
                price: 10
            },
            20: {
                id: 20,
                pic: 'http://p0.meituan.net/wmproduct/f322a78e01fc4c6cae24fff51ffc1bdd81760.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '辣海螺片军舰',
                sold: 102,
                price: 10
            },
            21: {
                id: 21,
                pic: 'http://p0.meituan.net/wmproduct/91e384833323f39a860ed6cb9b6cd22619827.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '鲜芒军舰',
                sold: 102,
                price: 10
            },
            22: {
                id: 22,
                pic: 'http://p1.meituan.net/wmproduct/72a6dccda432e950dc6aa72a05bbad04195383.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '鲜芒吞拿鱼',
                sold: 102,
                price: 10
            },
            23: {
                id: 23,
                pic: 'http://p0.meituan.net/meismis/2ac0d7bb466f3136058efb244228dc4f63725.png%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '肉松福袋',
                sold: 102,
                price: 10
            },
            24: {
                id: 24,
                pic: 'http://p0.meituan.net/meismis/2ac0d7bb466f3136058efb244228dc4f63725.png%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '蟹籽福袋',
                sold: 102,
                price: 10
            },
            25: {
                id: 25,
                pic: 'http://p0.meituan.net/deal/c0c7a22e0e3b99e2ef97a8f9aceea45037406.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '爱上柠檬',
                sold: 102,
                price: 10
            },
            26: {
                id: 26,
                pic: 'http://p0.meituan.net/wmproduct/91e384833323f39a860ed6cb9b6cd22619827.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '芒果鳗鱼握卷',
                sold: 102,
                price: 10
            },
            27: {
                id: 27,
                pic: 'http://p1.meituan.net/wmproduct/a89eb476c7e0b91641200504ba081192219822.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '芝士鳗鱼握卷',
                sold: 102,
                price: 10
            },
            28: {
                id: 28,
                pic: 'http://p0.meituan.net/xianfu/1d94119ab2ba180631fc73783e95f2f4460800.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '螺肉军舰',
                sold: 102,
                price: 10
            },
            29: {
                id: 29,
                pic: 'http://p0.meituan.net/wmproduct/db58a8ae8fab687d7cd1cd201fb084e9199316.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '蟹足肉握卷',
                sold: 102,
                price: 10
            },
            30: {
                id: 30,
                pic: 'http://p1.meituan.net/wmproduct/75d0ffa693b3f391f97502087a00b085182634.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '鱼蟹肉握卷',
                sold: 102,
                price: 10
            },
            31: {
                id: 31,
                pic: 'http://p0.meituan.net/xianfu/f8f64ac99177ca787a8766e7625c7872251904.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '韩国炸鸡紫菜卷',
                sold: 102,
                price: 10
            },
            32: {
                id: 32,
                pic: 'http://p1.meituan.net/xianfu/169910cc7bc3b9d42122f8611f5eedd6262144.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '芝士炸虾卷',
                sold: 102,
                price: 10
            },
            33: {
                id: 33,
                pic: 'http://p0.meituan.net/xianfu/0ece6042ee5bea62515e7d67dc011b96129024.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '芒果沙冰',
                sold: 102,
                price: 10
            },
            34: {
                id: 34,
                pic: 'http://p0.meituan.net/xianfu/8f0b2db9e1e83e9c57606470cadbb7cb94208.jpg%40120w_120h_1e_1c_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20',
                name: '咖喱鱼丸',
                sold: 102,
                price: 10
            }
            
		},
		goodsList: [
			{
				id: 'hot',
				classifyName: '热销',
				goods: [1, 2, 3, 4, 5]
			},
			{
				id: 'new',
				classifyName: '新品',
				goods: [1, 2, 3]
			},
			{
				id: 'vegetable',
				classifyName: '寿司',
                goods: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
			},
			{
				id: 'mushroom',
				classifyName: '主食',
                goods: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
			},
			{
				id: 'food',
				classifyName: '饮料',
                goods: [29, 30, 31, 32, 33, 34]
			}
		],
		cart: {
			count: 0,
			total: 0,
			list: {}
		},
		showCartDetail: false
	},
	onLoad: function (options) {
		var shopId = options.id;
		for (var i = 0; i < app.globalData.shops.length; ++i) {
			if (app.globalData.shops[i].id == shopId) {
				this.setData({
					shop: app.globalData.shops[i]
				});
				break;
			}
		}
	},
	onShow: function () {
		this.setData({
			classifySeleted: this.data.goodsList[0].id
		});
	},
	tapAddCart: function (e) {
		this.addCart(e.target.dataset.id);
	},
	tapReduceCart: function (e) {
		this.reduceCart(e.target.dataset.id);
	},
	addCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		this.data.cart.list[id] = num + 1;
		this.countCart();
	},
	reduceCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		if (num <= 1) {
			delete this.data.cart.list[id];
		} else {
			this.data.cart.list[id] = num - 1;
		}
		this.countCart();
	},
	countCart: function () {
		var count = 0,
			total = 0;
		for (var id in this.data.cart.list) {
			var goods = this.data.goods[id];
			count += this.data.cart.list[id];
			total += goods.price * this.data.cart.list[id];
		}
		this.data.cart.count = count;
		this.data.cart.total = total;
		this.setData({
			cart: this.data.cart
		});
	},
	follow: function () {
		this.setData({
			followed: !this.data.followed
		});
	},
	onGoodsScroll: function (e) {
		if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
			this.setData({
				scrollDown: true
			});
		} else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
			this.setData({
				scrollDown: false
			});
		}

		var scale = e.detail.scrollWidth / 570,
			scrollTop = e.detail.scrollTop / scale,
			h = 0,
			classifySeleted,
			len = this.data.goodsList.length;
		this.data.goodsList.forEach(function (classify, i) {
			var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
			if (scrollTop >= h - 100 / scale) {
				classifySeleted = classify.id;
			}
			h += _h;
		});
		this.setData({
			classifySeleted: classifySeleted
		});
	},
	tapClassify: function (e) {
		var id = e.target.dataset.id;
		this.setData({
			classifyViewed: id
		});
		var self = this;
		setTimeout(function () {
			self.setData({
				classifySeleted: id
			});
		}, 100);
	},
	showCartDetail: function () {
		this.setData({
			showCartDetail: !this.data.showCartDetail
		});
	},
	hideCartDetail: function () {
		this.setData({
			showCartDetail: false
		});
	},
	submit: function (e) {
		server.sendTemplate(e.detail.formId, null, function (res) {
			if (res.data.errorcode == 0) {
				wx.showModal({
					showCancel: false,
					title: '恭喜',
					content: '订单发送成功！下订单过程顺利完成，本例不再进行后续订单相关的功能。',
					success: function(res) {
						if (res.confirm) {
							wx.navigateBack();
						}
					}
				})
			}
		}, function (res) {
			console.log(res)
		});
	}
});

