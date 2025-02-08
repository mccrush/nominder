function hourlyAlert() {
  const btnTest = document.querySelector('#btnTest')
  const permission = document.querySelector('#permission')


  // Функция для показа уведомления
  function showAlert() {
    //alert('Прошёл ещё один час!');
    const notification = new Notification("Время сделать перерыв!", {
      body: "Проветри помещение и разомнись",
      icon: "/assets/logo-192.png",
    });
  }

  if ("Notification" in window) {
    console.log("The Notifications API is supported");

    permission.addEventListener("click", () => {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          console.log("The user accepted");
        }
      });
    });
  }

  // Получаем текущее время
  const now = new Date();
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();

  // Вычисляем, сколько миллисекунд осталось до следующего часа
  const millisecondsUntilNextHour = (60 - currentMinutes) * 60 * 1000 - currentSeconds * 1000;

  // Устанавливаем таймер на первый alert
  setTimeout(() => {
    showAlert(); // Показываем alert сразу в начале часа
    setInterval(showAlert, 60 * 60 * 1000); // Затем повторяем каждый час
  }, millisecondsUntilNextHour);

  btnTest.addEventListener('click', showAlert)
}

// Запускаем функцию
hourlyAlert();