<!--
 * @Description: 
 * @Version: 1.0
 * @Author: AaroLi
 * @Date: 2024-01-03 09:38:41
 * @LastEditors: AaroLi
 * @LastEditTime: 2024-01-09 02:42:52
-->
<template>
  <div class="header__nav">
    <div class="header__left">
      <div @click="showPicker = true">{{ cityName }} <van-icon name="arrow-down" color="#A6B2C3" size="17"
          style="vertical-align: middle;" /></div>
      <div class="fl6">
        <van-dropdown-menu ref="menuRef">
          <van-dropdown-item title="类别" ref="itemRef">
            <div class="Category__box">
              <div class="title">类别</div>
              <div class="clickBox">
                <div :class="isChange === 1 ? 'activeBox' : ''" @click="change(isChange === 1 ? null : 1)">实管</div>
                <div :class="isOtherChange === 1 ? 'activeBox' : ''" @click="otherChange(isOtherChange === 1 ? null : 1)"
                  class="ml18">前期</div>
              </div>
              <div class="btn">
                <div class="btn_left" @click="reset">重置</div>
                <div class="btn_right" @click="hasConfirm">确定</div>
              </div>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu><van-icon class="pt36 " name="arrow-down" color="#A6B2C3" size="17"
          style="vertical-align: middle;" />
      </div>
    </div>
    <div class="header__right ml4">
      <van-field v-model="keyWord" :right-icon="i_search" placeholder="请输入项目名称" @click-right-icon="hasSearch" />
      <div class="user" @click="hasUser"></div>
    </div>
    <van-popup v-model:show="showPicker" position="bottom">
      <div class="handleButton">
        <van-button style="border: none; color: #969799" @click="handleOrgCancel" size="normal">取消</van-button>
        <div class="font" size="normal">
          城市地区
        </div>
        <van-button style="border: none; color: #6398fb" size="normal" @click="handleConfirm">确认</van-button>
      </div>
      <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" @click-nav="isMenuActive"
        height="55vw" :items="items" />
    </van-popup>
  </div>
</template>
  
<script setup name="headerNav">
import i_search from '@/assets/images/i_search.png'
const router = useRouter();
const emit = defineEmits(["handleSearch"]);

const keyWord = ref('');
const itemRef = ref(null);
const menuRef = ref(null);
const cityName = ref('杭州市');
const showPicker = ref(false);
const isChange = ref(null);
const isOtherChange = ref(null);
const change = (v) => {
  isChange.value = v;
};
const otherChange = (v) => {
  isOtherChange.value = v;
};
// 关闭事件
const handleOrgCancel = () => {
  showPicker.value = false;
};
// 登录
const hasUser = () => {
  router.push({ name: "login" });
};
const activeIndex = ref(0);
const activeId = ref(1);
const items = [
  {
    text: '浙江市',
    children: [
      { text: '西湖区', id: 1 },
      { text: '上城区', id: 2 },
      { text: '滨江区', id: 3 },
      { text: '下城区', id: 4 },
      { text: '余杭区', id: 5 },
      { text: '临安区', id: 6 },
      { text: '临平区', id: 7 },
      { text: '萧山区', id: 8 },
    ],
  },
  {
    text: '上海市',
    children: [
      { text: '黄浦区', id: 9 },
      { text: '徐汇区', id: 10 },
      { text: '长宁区', id: 11 },
      { text: '静安区', id: 12 },
      { text: '宝山区', id: 13 },
      { text: '普陀区', id: 14 },
      { text: '虹口区', id: 15 },
      { text: '杨浦区', id: 16 },
      { text: '嘉定区', id: 17 },
      { text: '金山区', id: 19 },
      { text: '松江区', id: 20 },
    ],
    badge: 8,
  },
  {
    text: '苏州市',
    children: [
      { text: '虎丘区', id: 21 },
      { text: '吴中区', id: 22 },
      { text: '相城区', id: 23 },
      { text: '姑苏区', id: 24 },
      { text: '吴江区', id: 25 },
    ],
    badge: 5,
  },
  {
    text: '成都市',
    children: [
      { text: '锦江区', id: 26 },
      { text: '青羊区', id: 27 },
      { text: '金牛区', id: 28 },
      { text: '武侯区', id: 29 },
      { text: '成华区', id: 30 },
    ],
    dot: true,
  },
]
// 确认
const handleConfirm = () => {
  const result = items.map(item => item.children);
  if (activeId.value != '') {
    cityName.value = result.flat(Infinity).find(v => v.id == activeId.value).text
  } else {
    cityName.value = items[activeIndex.value].text
  }
  showPicker.value = false;
};
// 重置
const reset = () => {
  isChange.value = null;
  isOtherChange.value = null;
};
// 类别 => 确定
const hasConfirm = () => {
  itemRef.value.toggle();
};
// 搜索事件
const hasSearch = () => {
  // console.log('length',length)
  emit("handleSearch", keyWord.value);
};
// 切换父级区划事件
const isMenuActive = () => {
  activeId.value = '';
};
</script>
<style lang="less" scoped>
.header__nav {
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  z-index: 2;
  background: #FFFFFF;
  border-radius: 0px 0px 12px 12px;
}

.header__left {
  width: 107.5px;
  height: 35px;
  line-height: 35px;
  display: flex;
  margin-top: 8px;
  margin-left: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #383E44;
}

.fl6 {
  margin-left: 6.5px;
  display: flex;
}

:deep(.van-field) {
  width: 203.5px;
  height: 35px;
  background: #F3F3F3;
  border-radius: 8px;
  margin-top: 8px;
}

:deep(.van-dropdown-menu__title:after) {
  display: none;
}

:deep(.van-cell__value) {
  margin-top: -4px;
  margin-left: -8px;
}

.pt36 {
  padding-top: 10px;
  margin-left: 2px;
}

:deep(.van-dropdown-menu__bar) {
  height: 34px;
  box-shadow: none;
  background: none;
  padding: 0px;
}

:deep(.van-dropdown-menu__title) {
  padding: 0px;
  font-size: 12px;
  font-weight: 600;
  color: #383E44;
  margin-top: 2px;
}

.ml4 {
  margin-left: 4px;
}

.handleButton {
  display: flex;
  justify-content: space-between;
  height: 44px;
  line-height: 44px;
}

.font {
  font-size: 16px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  color: #171B1F;
  border: none;
}

.header__right {
  display: flex;
}

.user {
  width: 24px;
  height: 24px;
  margin-top: 11.5px;
  margin-left: 12px;
  background-image: url("~@/assets/images/i_user.png");
  background-size: 100% 100%;
}

.Category__box {
  height: 202px;
  background: #FFFFFF;

  .title {
    font-size: 15px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    color: #161A1D;
    margin-left: 16px;
    margin-top: 12px;
    margin-bottom: 18px;
  }
}

:deep(.van-dropdown-item__content) {
  border-radius: 0px 0px 12px 12px;
}

.clickBox {
  display: flex;
  text-align: center;
  margin-bottom: 60px;
  margin-left: 16px;

  div {
    width: 110px;
    height: 36px;
    line-height: 36px;
    border-radius: 20px;
    font-size: 14px;
    background: #F1F1F1;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    color: #667075;
  }

  .activeBox {
    background: #E8F2FF;
    color: #237EEE;
  }
}

.ml18 {
  margin-left: 18px;
}

.btn {
  display: flex;
  text-align: center;
  margin-left: 16px;

  div {
    width: 160px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 15px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
  }

  &_left {
    border: 1px solid #979797;
    color: #565B60;
  }

  &_right {
    background: #0D79FD;
    box-shadow: 0px 10px 20px 0px rgba(13, 121, 253, 0.07);
    color: #FFFFFF;
    margin-left: 22.5px;
  }
}
</style>