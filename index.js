const App = {
    data() {
      return {
        apiData:[],
        search:'',     
        areaData:'',      
        historical: [],
      };
    },
    methods:{
      // 先抓到資料
      getData(){
        let apiUrl = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';
        axios.get(apiUrl).then((res) => {
          this.apiData = res.data.result.records;
        })
      },
      getAreaData(item){
        this.areaData = item;     
      }
    },
    computed:{
      // 搜尋
      filterdata(){
        return this.apiData.filter((item)=>{        
          return item.Name.match(this.search);
        })
      }
    },
    watch:{
      // 監聽目前的地區資料有變動時觸發事件
      areaData(){
         if(this.historical.length < 10){
          this.historical.push(this.areaData);
        }else{
          // 移除第一筆
          this.historical.shift();
          this.historical.push(this.areaData);
        }     
      }
    },
    created(){
      // 呼叫抓到資料
      this.getData();    
    }
  };  
  Vue.createApp(App).mount('#app');