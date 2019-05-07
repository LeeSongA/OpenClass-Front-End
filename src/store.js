import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Identity: 0, // 신분 구분
    drawer: true, // 네비게이션 바 
    classCode: '', // 현재 클래스 코드  => 이 3개 하나로 합칠까? 
    className: '', // 현재 클래스 이름
    profName: '', // 현재 클래스 교수 이름
    links: [
      {
        to: '/class/',
        to2: '/home',
        icon: 'mdi-home',
        text: '홈'
      },
      {
        to: '/class/',
        to2: '/question',
        icon: 'mdi-comment-question-outline',
        text: '질문 클래스'
      },
      {
        to: '/class/',
        to2: '/survey',
        icon: 'mdi-clipboard-text-outline',
        text: '설문 클래스' 
      },
      {
        to: '/class/',
        to2: '/chart',
        icon: 'mdi-chart-bar',
        text: '통계'
      }
    ],
  },
  getters: { // 반복사용되는 값을 재사용하기 위해 사용. computed와 같은 기능
    allLinksCount: (state) => {
      return state.links.length;
    },
    getIdentity: (state) => {
      return state.Identity;
    },
  },
  mutations: { // state값을 변경하고자 할 때, commit을 이용해서 변경시킬 것임, State 관리
    setIdentity: (state, Identity) => state.Identity = Identity,
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer), // 상태 토글
    retrieveToken(state, token){
      state.token = token
    },
    setClassCode:(state, payload) => (state.classCode = payload),
    setClassName:(state, payload) => (state.className = payload),
    setProfName:(state, payload) => (state.profName = payload)
  },
  actions: { // mutations는 모든기능이 동기로 동작합니다. 비동기로 사용하기위해 이 actions을 사용. ditpatch로 사용.
    retrieveToken(context, credentials){

      //수정 필요할 듯
      //token cookie로 저장하고 있습니다. 
      Axios.post('/login', {
        username: credentials.username,
        password: credentials.password,
      })
      .then(res =>{
        const token = res.data.access_token
        localStorage.setItem('access_token', token)
        context.commit('retrieveToken', token)
      })
    }
  }
})
