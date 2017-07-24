class temperatureWidget {
  constructor(parentDOM) {
    this.parentDOM = document.getElementById(parentDOM);
    this.retryTimer;
    this.updateTimer;
    this.retry = 0;
  }
  request() {
    (this.retry < 1) ? this.parentDOM.innerHTML = `<section id="tempWidget">LOADING<i class="fa fa-spinner fa-pulse fa-3x"></i></section>` : (this.retry >= 1 && this.retry <= 2) ? this.parentDOM.innerHTML = `<section id="tempWidget">LOADING... SERVER WHERE ARE YOU?<i class="fa fa-spinner fa-pulse fa-3x"></i></section>`: this.parentDOM.innerHTML = `<section id="tempWidget">LOADING... Remember to accept <a href="https://nightkn8.dlinkddns.com/">THIS CERTIFICATE</a><i class="fa fa-spinner fa-pulse fa-3x"></i></section>`;
    const request = $.ajax({
      type: 'GET',
      url: "https://nightkn8.dlinkddns.com/app",
      dataType: "json",
      success: (data) => data
    });
    request.done((obj) => {
      clearTimeout(this.retryTimer);
      clearTimeout(this.updateTimer);
      this.temp = obj.temperature;
      this.date = obj.date;
      this.time = () => {
        const h = obj.time.split(':')[0],
          m = obj.time.split(':')[1];
        return `${h}:${m}`;
      }
      this.retry = 0;
      this.render();
      this.updateTimer = setTimeout(() => {
        this.request();
      }, 300000)
    }).fail(this.retryTimer = setTimeout(() => {
      clearTimeout(this.retryTimer);
      clearTimeout(this.updateTimer);
      this.retry++;
      this.request();
    }, 10000));
  };
  render() {
    return this.parentDOM.innerHTML = `
        <section id="tempWidget">
            <section id="temp">
                ${Math.round(this.temp)}&#176;
            </section>
            <section id="location">
                <i class="fa fa-map-marker" aria-hidden="true"></i> DOBROWODA
            </section>
            <section id="date">
                <section id="time">
                    ${this.time()}
                </section>
                <section id="day">
                    ${new Date(this.date).toLocaleDateString()}
                </section>
            </section>
        </section>`;
  }
};
const tempWidget = new temperatureWidget("container");
$(document).ready(() => {
  tempWidget.request();
});