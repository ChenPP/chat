<template>
  <div>
    <div>
      <h3>Name: {{ userName }}</h3>
      <div @click="setName()" v-show="!userNameSet">Rest Name</div>
    </div>
    <div v-show="userNameSet">
      <div>
        <header>
          <h2>輸入暱稱</h2>
        </header>
        <input type="text" v-model="userName">
        <button @click="saveName()">確定</button>
        <div v-show="checkName">請輸入暱稱</div>
      </div>
    </div>
    <div>
      <div>
        <img src="https://lorempixel.com/50/50/">
        <div>test Room</div>
      </div>
      <div>
        <!-- ChatRoom -->
        <template v-for="item in messages">
          <!-- other people -->
          <template v-if="item.userName !== userName">
            <div :key="item.id">
              <img src="https://lorempixel.com/40/40/" draggable="false">
              <div>{{item.userName}}</div>
              <div v-if="item.type === 'text'">
                <div>{{item.message}}</div>
              </div>
              <div>{{item.timeStamp}}</div>
            </div>
          </template>
          <!-- self -->
          <template>
            <div :key="item.id">
              <div>{{item.timeStamp}}</div>
              <div v-if="item.type === 'text'">
                <div>{{item.message}}</div>
              </div>
            </div>
          </template>
        </template>
        <!-- 輸入框 -->
        <div>
          <textarea v-model="messageText" @keydown.enter="sendMessage($event)"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const msgRef = firebase.database().ref('/messages/');
export default {
  name: 'ChatRoom',
  data() {
    return {
      userNameSet: false,
      userName: '',
      checkName: false,
      messages: [],
      messageText: '',
    };
  },
  mounted() {
    const vm = this;
    msgRef.on('value', (snapshot) => {
      const val = snapshot.val();
      console.log('TCL: mounted -> val', val);
      const messageData = val ? Object.keys(val).map(key => ({ id: key, ...val[key] })) : null;
      vm.messages = messageData;
    });
    this.getTime();
  },
  methods: {
    setName() {
      this.userNameSet = true;
    },
    saveName() {
      console.log(this.userName);
      if (this.userName) {
        this.userNameSet = false;
        this.checkName = false;
      } else {
        this.checkName = true;
      }
    },
    getTime() {
      const date = this.$moment().format('h:mm a');
      return date;
    },
    sendMessage(e) {
      console.log('enter');
      const text = this.messageText;
      // if (e.shiftKey) return false;
      if (text) {
        console.log('有');
      }
      if (!text && text.trim() === '') {
        console.log('空白喔喔喔');
        e.preventDefault();
        return false;
      }
    },
  },
};
</script>


<style>

</style>
