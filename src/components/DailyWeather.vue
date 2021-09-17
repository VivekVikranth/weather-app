<template>
    <div>
      <div class="daily-weather" v-if="location">
        <div class="daily-weather__title">
          <div class="daily-weather__leftArea">
            <div class="daily-weather__currentTemp">

            </div>
          </div>
          <div class="daily-weather__rightArea">
            <!-- {{city}} -->
          </div>
        </div>
        <div class="daily-weather__cardsContaniner">
          <div class="daily-weather__cards" v-for="(list, i) in weatherlist" :key="i">
            <div class="daily-weather__day">{{list.day}}</div>
            <div class="daily-weather__illustration">
              <img :src="weatherIllustration + list.weather[0].icon + '@2x.png'" alt="weather" />
            </div>
            <div>
              <span class="daily-weather__maxTemp">{{Math.round(list.temp.max)}} &#8451;
              </span>
              <span class="daily-weather__minTemp"> {{Math.round(list.temp.min)}} &#8451;
              </span>
              </div>
          </div>
        </div>
      </div>
      <div class="error" v-if="!location">
        Please turn on your location
     </div>
    </div>
</template>
<style lang="scss">
  .daily-weather {
    width: 1280px;
    margin: auto;
    .daily-weather__title {
      display: flex;
    }

    .daily-weather__rightArea {
      text-align: right;
    }

    .daily-weather__cardsContaniner {
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      .daily-weather__cards {
        display: flex;
        flex-direction: column;
        padding: 12px 4px;
        border:1px solid #ccc;
        background:#d0d0d0;
        cursor: pointer;
        border-radius: 8px;

        &:hover {
          background-color: rgb(238, 238, 238);
        }

        .daily-weather__day {
          text-align: center;
          padding-bottom: 12px;
        }

        .daily-weather__minTemp {
          font-size: 14px;
        }
      }
    }
  }
</style>
<script>
export default {
  name: 'DailyWeather',
  data: () => ({
    city: '',
    weatherNotLoadedMessage: '',
    lat: '',
    long: '',
    weatherlist: '',
    weatherIllustration: 'https://openweathermap.org/img/wn/',
    location: true,
  }),
  methods: {
    async getLocation() {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          this.getData();
        });
      } else {
        this.location = false;
      }
    },

    async getData() {
      const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.long}&exclude=current,minutely,hourly,alerts&units=metric&cnt=5&appid=b8fcf9cf2f1a3e3be1eb2980c5c17c52`;
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      try {
        const response = await this.$http.get(
          url,
        );
        // JSON responses are automatically parsed.
        const weatherData = response.data;
        // Commented as this response gives mixed (hourly response)
        // this.city = weatherData.city.name;

        // this.weatherlist = weatherData.list.filter((list, index, array) => {
        //   const prevList = array[index - 1] ? new Date(array[index - 1].dt_txt).getDate() : 0;
        //   const curList = new Date(list.dt_txt).getDate();

        //   return prevList < curList;
        // })
        //   .map((ele) => {
        //     const list = ele;
        //     list.day = days[new Date(ele.dt_txt).getDay()];

        //     return list;
        //   });

        const data = weatherData.daily.map((ele) => {
          const list = ele;
          list.day = days[new Date(ele.dt * 1000).getDay()];

          return list;
        });

        // Filtering 5 days weather report
        this.weatherlist = data.filter((ele, i) => i < 5);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getLocation();
  },
};
</script>
